import React, { useEffect, useRef } from 'react'
import GroupMessagebox from './GroupMessageBox'


function GroupChatBody({message}) {
  const chatbody=useRef(null)
  let n='',m=''
    useEffect(()=>{
      if (chatbody && chatbody.current) {
        chatbody.current.scrollIntoView()
      }
    })

    useEffect(()=>{
      if (chatbody && chatbody.current) {
        chatbody.current.scrollIntoView()
      }
    },[message])

  return (
    <>
    <div className='flex flex-col w-full h-full overflow-auto antialiased bg-gradient-to-b from-blue-100 to-white' >
    <div >
      {
        message.map((data)=>{
          m=data.name
        if(n===data.name) m='';
        n=data.name
      return(
            <GroupMessagebox msg={data.message} id={data.sender_id} key={data.id} name={m} img={data.image}/>
           )
        })
      }
    </div>
    <div ref={chatbody}/>
    </div>
    </>
    )
}

export default GroupChatBody