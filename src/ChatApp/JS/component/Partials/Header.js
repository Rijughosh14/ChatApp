import React, { createContext, useContext } from 'react'
import { Outlet } from 'react-router-dom'
import { UserContext } from '../../hooks/context';
import Chat from '../../pages/Chat/Chat'
import FriendProfile from '../../pages/Profile/FriendProfile';
import GroupProfile from '../../pages/Profile/GroupProfile';


export const ImageContext = createContext();


function Header() {
  const {Chatstate}=useContext(UserContext)

  return (
    <>
    <div className='relative'>
    <div className='flex flex-row'>
      <div>
        <Outlet/>
      </div>
      <div className='h-screen w-screen'>
        <Chat/>
      </div>
      <div>
        {Chatstate.profileState&&(Chatstate.set==='normal'?<FriendProfile/>:<GroupProfile/>)}
      </div>
    </div>
    </div>
    </>
  )
}



export default Header