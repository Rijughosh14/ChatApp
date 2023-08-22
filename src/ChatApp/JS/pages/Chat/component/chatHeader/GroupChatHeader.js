import React, { useContext } from 'react'
import Avatar from '../../../../component/Avatar'
import { UserContext } from '../../../../hooks/context'

function GroupChatHeader({ name, link }) {

    const {Chatstate,dispatchChat}=useContext(UserContext)

    const setState=()=>{
        dispatchChat({type:'SET_PROFILE',payload:{profileState:!Chatstate.profileState}})
    }

    return (
        <>
            <div className='flex flex-row bg-blue-100 gap-2 rounded-b-lg relative'>
                <div className='p-2'>
                    <button onClick={()=>setState()}>
                        <Avatar link={link} />
                    </button>
                </div>

                <div className='p-2 absolute right-1/2 top-1 font-bold italic text-2xl text-blue-gray-800'>
                    <h4>
                        {name}
                    </h4>
                    <div>
                        <h6>
                            {/* online */}
                        </h6>
                    </div>
                </div>

                <div>

                </div>
            </div>
        </>
    )
}

export default GroupChatHeader