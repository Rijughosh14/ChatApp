import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input
} from "@material-tailwind/react";
import React, { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../hooks/context'
import { image_upload, update } from '../../services/userService'
import camera from '../../Asset/camera.png'
import { toast } from "react-toastify";




const Profile = () => {

  const[Phone_number,setPhonenumber]=useState()
  const[Name,setName]=useState()
  const[Profile_pic,setProfile_pic]=useState(``)
  const[pic,setpic]=useState(false)
  const [Profile, setProfile] = useState('')
  const{state,dispatch}=useContext(UserContext)
  const ref=useRef()

  useEffect(()=>{
      setPhonenumber(state.number)
      setName(state.user)
      setProfile(state.profile_pic!==' '?process.env.REACT_APP_IMAGE_URL+state.profile_pic:camera)
      setProfile_pic(state.profile_pic!==' '?process.env.REACT_APP_IMAGE_URL+state.profile_pic:camera)
      ref.current.focus()
  },[state])
  

  const handleprofile=(e)=>{  
    setpic(true)
    setProfile(e.target.files[0])
    setProfile_pic(URL.createObjectURL(e.target.files[0]))
  }

  const submitData=async(e)=>{
    e.preventDefault();
    const imgresponse = pic?await image_upload(Profile):state.profile_pic
   const response=await update(Phone_number, Name, imgresponse)
   dispatch({type:'UPDATE_USER',payload:{user:response.name,profile_pic:response.profile_pic}});
   toast.success('update successsful')
  }

  return (
    <>
    <div className='flex flex-col bg-blue-100 h-screen w-full relative'>
      <div className="absolute top-2 left-2">
      <h1 className="text-3xl text-gray-800 font-serif"><a href="/home">কথা</a></h1>
      </div>
     <Card className="w-96 m-auto shadow-2xl">
      <CardHeader floated={true} className="h-80">
        <label htmlFor="avatar">     
            <input type="file" id='avatar' accept='image/*' hidden onChange={(e)=>handleprofile(e)}/>
            <img src={Profile_pic} alt='profile' className='cursor-pointer object-cover h-full w-full'/>
        </label>
         </CardHeader>
      <CardBody className="text-center">
        <Input  size="lg" variant='standard' defaultValue={Name}  onChange={(e)=>setName(e.target.value)} required className="text-black mb-4 text-xl" ref={ref}/>
        <Input size="lg" variant='standard' defaultValue={Phone_number} readOnly className="text-black text-xl"/>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
      <Button onClick={(e)=>submitData(e)}>
          UPDATE
        </Button>
      </CardFooter>
    </Card>
    </div>
    </>
    
  )
}

export default Profile