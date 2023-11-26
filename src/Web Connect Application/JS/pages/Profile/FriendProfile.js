import { Avatar, Card, CardBody, CardHeader, Input, Typography } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../hooks/context'
import camera from '../../Asset/camera.png'

// import Avatars from '../../component/Avatar'

const FriendProfile = () => {
    const {Chatstate,dispatchChat}=useContext(UserContext)
    const [name,setName]=useState('')
    const [number,setNumber]=useState('')
    const [profile,setProfile]=useState('')
    useEffect(()=>{
        setName(Chatstate.user)
        setNumber(Chatstate.phone_number)
        setProfile(Chatstate.profile_pic!==' '?Chatstate.profile_pic:camera)
    },[Chatstate])
  return (
    <>
    <div className="flex h-full relative">
    <div className='absolute top-0 left-0 z-10'>
            <button onClick={()=>dispatchChat({type:'SET_PROFILE',payload:{profileState:!Chatstate.profileState}})}>
                X
            </button>
        </div>
      <Card className=" flex w-96 relative gap-1">
        <CardHeader
          variant="gradient"
          color="blue"
          className=" grid h-8 place-items-center bg-[#1da1f2]"
          floated={false}
        >
          <Typography variant="h5" color="white">
            Profile
          </Typography>
        </CardHeader>
        <CardBody className="gap-4 flex flex-col max-h-4/5 overflow-auto">
          <div className="m-auto">
            <div className="border border-solid rounded-full border-gray-200 h-32 w-32">
                <Avatar src={profile} alt='profile' className='mx-2 my-2 cursor-pointer' size='xxl' variant='circular' />
            </div>
          </div>
          <div>
            <Input variant="standard" label={"Name"} color={"blue"} value={name} readOnly />
          </div>
          <div className='mt-4'>
            <Input variant="standard" label={"Phone Number"} color={"blue"} value={number} readOnly />
          </div>
        </CardBody>

      </Card>
    </div>
  </>
  )
}

export default FriendProfile