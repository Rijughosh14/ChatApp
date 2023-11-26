import React, { useContext, useState } from 'react'
import { getUserSession, handle_GroupMessage, image_upload } from '../../../../services/userService'
import { socket } from '../../../../Socket/Socket';
import { UserContext } from '../../../../hooks/context';
let i = -1

function GroupChatBox({ id, setGroupmessage }) {

  const [msg, Setmsg] = useState('')
  const {state} = useContext(UserContext)


  //handle image sent
  const handleimg = async (e) => {
    e.preventDefault()
    const response = await image_upload(e.target.files[0])
     await handle_GroupMessage(getUserSession().user, id, null, response)
    setGroupmessage(null, getUserSession().user,state.user, i, response,id)
    socket.emit("refresh_chat")
    socket.emit("send_Groupmessage", {RoomId:id,chat:null,
      sender_id:getUserSession().user,
      name:state.user,
      id:i,
      image:response});
    i = i - 1
  }

  //enter key event handler
  const handleKeyDown = async(event) => {
    if (event.key === 'Enter') {
      if (msg === '') {
        return
      }
      else {
        await  handle_GroupMessage(getUserSession().user, id, msg, null)
        setGroupmessage(msg, getUserSession().user,state.user, i, null,id)
        Setmsg('')
        socket.emit("refresh_chat")
        i=i-1
        socket.emit("send_Groupmessage", {RoomId:id,chat:msg,
          sender_id:getUserSession().user,
          name:state.user,
          id:i,
          image:null});
      }
    }
  };

  //handle msg sent
  const handleMsg = async (e) => {
    e.preventDefault()
    if (msg === '') {
      return
    }
    else {
      await handle_GroupMessage(getUserSession().user, id, msg, null)
      setGroupmessage(msg, getUserSession().user,state.user, i, null)
      Setmsg('')
      socket.emit("refresh_chat")
      i=i-1
      socket.emit("send_Groupmessage", {RoomId:id,chat:msg,
        sender_id:getUserSession().user,
        name:state.user,
        id:i,
        image:null});
    }
  }

  return (
    <>
      <div
        className="flex flex-row items-center h-20 rounded-xl bg-blue-100 w-full px-4">
        <div>
          <button
              className="flex items-center justify-center text-gray-800 hover:text-gray-900">
            <label htmlFor='formid' className='hover:cursor-pointer'>
              <input type='file' id='formid' hidden accept='image/*' onChange={(e) => handleimg(e)} />
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                ></path>
              </svg> 
              </label>
          </button>
        </div>
        <div className="flex-grow ml-4">
          <div className="relative w-full">
            <input
              type="text"
              className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
              value={msg} 
              onChange={(e) => Setmsg(e.target.value)} 
              onKeyDown={(event) => handleKeyDown(event)}
            />
          </div>
        </div>
        <div className="ml-4">
          <button
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
            onClick={(e) => handleMsg(e)}>
            <span>Send</span>
            <span className="ml-2">
              <svg
                className="w-4 h-4 transform rotate-45 -mt-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                ></path>
              </svg>
            </span>
          </button>
        </div>
      </div>
    </>
  )
}

export default GroupChatBox
