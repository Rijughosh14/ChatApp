import React, { useContext, useEffect, useState } from 'react'
import Avatar from '../../../component/Avatar'
import { UserContext } from '../../../hooks/context'
import { getUserSession } from '../../../services/userService'


function Chatcomponent({ id, name, set, profile, number, notification }) {

  const { dispatchChat } = useContext(UserContext)
  const [noti, setnoti] = useState(null)
  const [Name, setname] = useState('')
  const [ProfilePic, setProfilePic] = useState(null)

  useEffect(() => {
    if (notification && notification.sender_id !== getUserSession().user) {
      setname(notification.name)
    }
    if (notification && notification.len) {
      setnoti(notification.len)
    }
    setProfilePic(profile)
  }, [notification,noti,profile])


  const Chatset = (e) => {
    e.preventDefault()
    if (getUserSession().user === id) return
    if (set === 0) {
      dispatchChat({ type: 'SET_USER', payload: { user: name, loggedIn: false, id: id, set: 'group', profile_pic: ProfilePic } });
    }
    else {
      dispatchChat({ type: 'SET_USER', payload: { user: name, loggedIn: false, id: id, set: 'normal', profile_pic: ProfilePic, phone_number: number } });
    }
    setnoti(null)
  }
  return (
    <div onClick={(e) => Chatset(e)} className='border-solid  border-lime-100'>
      <div className={`flex flex-row gap-2 p-2 hover:bg-blue-200 hover:text-white
    hover:rounded-lg m-1 hover:cursor-pointer ${noti && "bg-green-200 rounded-lg m-1 hover:"}`}  >
        <div className='mx-2' >
          <Avatar link={ProfilePic} />
        </div>
        <div className=' w-3/4 h-14' >
          <h1>
            <b className='text-black'>
              {name}
            </b>
          </h1>
          <h5>
            {Name ? Name + ':' : ''} {notification && notification.message ? notification.message : ''}
            {notification && notification.image ? "IMG" : ''}
          </h5>
          <div>
            {/* {noti && <span>{noti}</span>} */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Chatcomponent
