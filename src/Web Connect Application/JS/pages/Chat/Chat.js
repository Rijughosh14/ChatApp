import React, { useEffect, useState, useContext,useCallback } from 'react'
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
import { useDispatch, useSelector } from 'react-redux';
import {addChat,addGroupChat,Chats,GroupChats} from '../../Features/Chat/ChatSlice.js'


function Chat() {
  const { Chatstate } = useContext(UserContext)
  const [chat, setchat] = useState(true)
  const [data, setdata] = useState([])
  const [Groupdata, setGroupdata] = useState([])

  
   //dispatch action
   const dispatch=useDispatch()

  //redux initial state check
  const chatdata = useSelector((state) => {
    if (Chatstate&&Chatstate.id) {
      const data= state?.chats?.Chat?.[Chatstate.id];
      if(data){
        return data
      }
      return null;
      
    }
    // Return a default value or handle the case when Chatstate.id is blank
    return null;
  });  

  const Groupchatdata = useSelector((state) => {
    if (Chatstate&&Chatstate.id) {
      const data= state?.chats?.GroupChat?.[Chatstate.id];
      if(data) {
        return data
      }
      return null;
    }
    // Return a default value or handle the case when Chatstate.id is blank
    return null; // You can replace null with any suitable default value
  });

 

  

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
  const getmessages = useCallback(async (id) => {
    if(chatdata){
      setdata(chatdata)
      return
    }
    try {    
      const result = await get_message(getUserSession().user, id)
      dispatch(Chats({id,result}))
      setdata(result)
    } catch (error) {
      console.log(error)
    }
  },[dispatch])

  // get group messages
  const getgroupmessages = useCallback(async (id) => {
    console.log("first")
    if(Groupchatdata){
      setGroupdata(Groupchatdata)
      return
    }
    try {     
      const result = await get_GroupMessage(id)
      dispatch(GroupChats({id,result}))
      setGroupdata(result)
    } catch (error) {
      console.log(error)
    }
  },[dispatch])

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

  useEffect(() => {
    setchat(Chatstate&&Chatstate.loggedIn)
    Chatstate&&(!chat&&(Chatstate.set === 'normal' ? getmessages(Chatstate.id) : getgroupmessages(Chatstate.id)))
  }, [Chatstate,chat,getmessages,getgroupmessages])



  return (
    chat ?
     <>
      <PlainChat />
    </> :
    
    <>
        <div className='flex flex-col bg-gray-200	w-full h-full'>
        {Chatstate && (
  <>
    {Chatstate.set === 'normal' ? (
      <>
        <NormalChatHeader name={Chatstate.user} link={Chatstate.profile_pic} />
        <NormalChatBody message={data} />
        <NormalChatBox id={Chatstate.id} setmessage={setmessage} />
      </>
    ) : (
      <>
        <GroupChatHeader name={Chatstate.user} link={Chatstate.profile_pic} />
        <GroupChatBody message={Groupdata} />
        <GroupChatBox id={Chatstate.id} setGroupmessage={setGroupmessage} />
      </>
    )}
  </>
)}

        </div>
    </>
        )
}

export default Chat