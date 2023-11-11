import React, { useEffect, useRef } from 'react'
import GroupMessagebox from './GroupMessageBox'


function GroupChatBody({message}) {
  const chatbody=useRef(null)
  let n='',m=''
    useEffect(()=>{
      if (chatbody && chatbody.current) {
        chatbody.current.scrollIntoView({behavior:"smooth"})
      }
    },[])

    useEffect(() => {
      if (chatbody && chatbody.current) {
        const shouldScroll = message.length > 0 && message.length !== chatbody.current.children.length;
        if (shouldScroll) {
          chatbody.current.scrollIntoView();
        }
      }
    }, [message]);

  return (
    <>
    <div className='flex flex-col w-full h-full overflow-auto antialiased bg-gradient-to-b from-blue-100 to-white' >
    <div >
      {message.length!==0&&
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