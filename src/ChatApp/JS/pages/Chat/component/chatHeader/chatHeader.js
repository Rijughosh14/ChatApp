import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../../../../component/Avatar'
import { UserContext } from '../../../../hooks/context'
import { IoMdCall } from 'react-icons/io'
import { FcVideoCall } from 'react-icons/fc'
import { Link, useNavigate } from 'react-router-dom'
import { getCallcookie, getUserSession, setCallcookie, getCallercookie } from '../../../../services/userService'
import { socket } from '../../../../Socket/Socket'
import Mediapeer, { cameraPermission, MediaPeer, microphonePermission } from '../../../Call_Connection/component/useMedia'
import { toast } from 'react-toastify'


function NormalChatHeader({ name, link }) {

    const { Chatstate, dispatchChat } = useContext(UserContext)
    const [data, setdata] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const data = getCallcookie()
        const Data = getCallercookie()
        data !== undefined && setdata(false)
        Data !== undefined && setdata(false)
    }, [])

    const setState = () => {
        dispatchChat({ type: 'SET_PROFILE', payload: { profileState: !Chatstate.profileState } })
    }


    const callmade = async () => {
        const result = await microphonePermission()
        const result1 = await cameraPermission()
        if (result === 'granted' && result1 === 'granted') {
            // Microphone permission has been granted   
            socket.emit('video-call-made', { caller: getUserSession().user, callee: Chatstate.id })
            setCallcookie(Chatstate.id)
            navigate('/videochat')
        }
        else if (result === 'denied' || result1 === 'denied') {
            // Microphone permission has been denied
            toast.error(" Permission Denied,check browser setting")
        } else {
            // Permission status is 'prompt' or 'unknown'
            Mediapeer()
                .then(() => {
                    socket.emit('video-call-made', { caller: getUserSession().user, callee: Chatstate.id })
                    setCallcookie(Chatstate.id)
                    navigate('/videochat')
                })
        }
    }


    const call = async () => {
        const result = await microphonePermission()
        if (result === 'granted') {
            // Microphone permission has been granted   
            socket.emit('call-made', { caller: getUserSession().user, callee: Chatstate.id })
            setCallcookie(Chatstate.id)
            navigate('/call')
        }
        else if (result === 'denied') {
            // Microphone permission has been denied
            toast.error("Microphone Permission Denied")
        } else {
            // Permission status is 'prompt' or 'unknown'
            MediaPeer()
                .then(() => {
                    socket.emit('call-made', { caller: getUserSession().user, callee: Chatstate.id })
                    setCallcookie(Chatstate.id)
                    navigate('/call')
                })
        }
    }

    return (
        <>
            <div className='flex flex-row bg-blue-100 gap-2 rounded-b-lg space-between relative'>
                <div className='p-2'>
                    <button onClick={() => setState()}>
                        <Avatar link={link} />
                    </button>
                </div>

                <div className='p-2 absolute right-1/2 top-1 font-bold italic text-2xl text-blue-gray-800'>
                    <h4>
                        {name}
                    </h4>
                </div>
                {data &&
                    <div className='gap-4 flex h-full ml-auto px-6'>
                        <button className=''>
                            <Link>
                                <IoMdCall size={'30px'} onClick={call} />
                            </Link>
                        </button>
                        <button>
                            <Link>
                                <FcVideoCall size={'30px'} onClick={callmade} />
                            </Link>
                        </button>
                    </div>}
            </div>
        </>
    )
}

export default NormalChatHeader