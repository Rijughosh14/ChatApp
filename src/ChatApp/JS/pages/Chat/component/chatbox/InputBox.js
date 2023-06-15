import {
  Button,
} from '@material-tailwind/react'
import React, { useState } from 'react'
import { getUserSession, handle_message, image_upload } from '../../../../services/userService'
import { FiPaperclip } from "react-icons/fi";
import { socket } from '../../../../Socket/Socket';
let i = -1



function NormalChatBox({ id, setmessage }) {
  const [msg, Setmsg] = useState('')

  const handleimg = async (e) => {
    e.preventDefault()
    const response = await image_upload(e.target.files[0])
    await handle_message(getUserSession().user, id, null, response)
    setmessage(null, getUserSession().user, i, response)
    socket.emit("refresh_chat")
    socket.emit("send_message", {
      recipient_id: id, chat: null,
      sender_id: getUserSession().user,
      id: i,
      image: response
    });
    i = i - 1
  }

  //enter key event handler
  const handleKeyDown = async (event) => {
    if (event.key === 'Enter') {
      if (msg === '') {
        return
      }
      else {
         await handle_message(getUserSession().user, id, msg, null)
        setmessage(msg, getUserSession().user, i, null)
        Setmsg('')
        socket.emit("refresh_chat")
        socket.emit("send_message", {
          recipient_id: id, chat: msg,
          sender_id: getUserSession().user,
          id: i,
          image: null
        });
        i = i - 1
      }
    }
  };

  const handleMsg = async(e) => {
    e.preventDefault()
    if (msg === '') {
      return
    }
    else {
      await handle_message(getUserSession().user, id, msg, null)
      setmessage(msg, getUserSession().user, i, null)
      Setmsg('')
      socket.emit('refresh_chat')
      socket.emit("send_message", {
        recipient_id: id,
        chat: msg,
        sender_id: getUserSession().user,
        id: i,
        image: null
      });
      i = i - 1
    }
  }

  return (
    <>
      <div className='flex flex-row bg-green-300 justify-between h-16 items-centre w-full rounded-lg p-2 gap-1'>
        <div className='m-auto'>
          <label htmlFor='formid' className='cursor-pointer'>
            <input type='file' id='formid' hidden accept='image/*' onChange={(e) => handleimg(e)} />
            <FiPaperclip size={'30px'} />
          </label>
        </div>
        <div className=' bg-white my-1 mx-2 w-full rounded-lg'>
          <input type="text" placeholder='enter your text' className='w-full h-full rounded-lg p-2 outline-none' value={msg} onChange={(e) => Setmsg(e.target.value)} onKeyDown={(event) => handleKeyDown(event)} />
        </div>
        <div className='my-1'>
          <Button onClick={(e) => handleMsg(e)}>SEND</Button>
        </div>
      </div>
    </>
  )
}

export default NormalChatBox