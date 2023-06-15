import React, { useEffect, useState, useContext } from 'react'
import NormalChatBody from './component/chatbody/normalchatBody'
import NormalChatBox from './component/chatbox/InputBox'
import NormalChatHeader from './component/chatHeader/chatHeader'
import PlainChat from './PlainChat'
import { UserContext } from '../../hooks/context'
import GroupChatBody from './component/chatbody/group/GroupChatbody'
import GroupChatBox from './component/chatbox/GroupInputbox'
import GroupChatHeader from './component/chatHeader/GroupChatHeader'
import { getUserSession, get_GroupMessage, get_message } from '../../services/userService'
import { socket } from '../../Socket/Socket'


function Chat() {
  const { Chatstate } = useContext(UserContext)
  const [chat, setchat] = useState(true)
  const [data, setdata] = useState([])
  const [Groupdata, setGroupdata] = useState([])

  useEffect(() => {
    setchat(Chatstate.loggedIn)
    Chatstate.set === 'normal' ? getmessages(Chatstate.id) : getgroupmessages(Chatstate.id)
  }, [Chatstate])

  useEffect(() => {
    socket.on('received_message', (data) => {
      if(data.sender_id===Chatstate.id){
      setmessage(data.chat, data.sender_id, data.id, data.image)
      }
    })
    return () => {
      socket.off('received_message') 
       }
  },[Chatstate])

  useEffect(()=>{
    socket.on('received_Groupmessage',(data)=>{
      if(data.RoomId===Chatstate.id){
      setGroupmessage(data.chat,data.sender_id,data.name,data.id,data.image)
      }
    })
    return()=>{
      socket.off('received_Groupmessage')
    }
  },[Chatstate])

  //get normal messages
  const getmessages = async (id) => {
    const result = await get_message(getUserSession().user, id)
    setdata(result)
  }
  // get group messages
  const getgroupmessages = async (id) => {
    const result = await get_GroupMessage(id)
    setGroupdata(result)
  }

  //function to set new normal message
  const setmessage = (msg, id, n, response) => {
    setdata((data) => [...data,
    {
      chat: msg,
      sender_id: id,
      id: n,
      image: response
    }])
  }

  // function to set new group messages

  const setGroupmessage = (msg, id,username, n, response) => {
    setGroupdata((data) => [...data,
    {
      message: msg,
      sender_id: id,
      name: username,
      id: n,
      image: response
    }])
  }
  return (
    chat ? <>
      <PlainChat />
    </> :
      <>
        <div className='flex flex-col bg-gray-200	w-full h-full'>
          {Chatstate.set === 'normal' ? <NormalChatHeader name={Chatstate.user} link={Chatstate.profile_pic} /> : <GroupChatHeader name={Chatstate.user} link={Chatstate.profile_pic} />}
          {Chatstate.set === 'normal' ? <NormalChatBody message={data} /> : <GroupChatBody message={Groupdata} />}
          {Chatstate.set === 'normal' ? <NormalChatBox id={Chatstate.id} setmessage={setmessage} /> : <GroupChatBox id={Chatstate.id} setGroupmessage={setGroupmessage} />}
        </div>
      </>
  )
}

export default Chat