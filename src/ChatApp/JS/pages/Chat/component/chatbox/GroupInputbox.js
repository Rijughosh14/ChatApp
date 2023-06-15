import { Button } from '@material-tailwind/react'
import React, { useContext, useState } from 'react'
import { getUserSession, handle_GroupMessage, image_upload } from '../../../../services/userService'
import { FiPaperclip } from "react-icons/fi";
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
    setGroupmessage(null, getUserSession().user,state.user, i, response)
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
      <div className='flex flex-row bg-green-300 justify-between h-16 items-centre w-full rounded-lg p-2 gap-1'>
        <div className='m-auto'>
          <label htmlFor='formid' className='cursor-pointer'>
            <input type='file' id='formid' hidden onChange={(e) => handleimg(e)} />
            <FiPaperclip size={'30px'} />
          </label>
        </div>
        <div className=' bg-white my-1 mx-2 w-full rounded-lg'>
          <input type="text" placeholder='enter your text' className='w-full h-full rounded-lg p-2 outline-none' value={msg} onChange={(e) => Setmsg(e.target.value)} onKeyDown={(event)=>handleKeyDown(event)}/>
        </div>
        <div className='my-1'>
          <Button onClick={(e) => handleMsg(e)}>SEND</Button>
        </div>
      </div>
    </>
  )
}

export default GroupChatBox