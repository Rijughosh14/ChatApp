import { Avatar, Card, Input ,Button} from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
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

  useEffect(()=>{
      setPhonenumber(state.number)
      setName(state.user)
      setProfile(state.profile_pic!==' '?process.env.REACT_APP_IMAGE_URL+state.profile_pic:camera)
      setProfile_pic(state.profile_pic!==' '?process.env.REACT_APP_IMAGE_URL+state.profile_pic:camera)
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
    <div className='flex flex-col bg-gray-600 h-screen w-full'>
    <Card className=' m-auto gap-2 relative h-96 w-96 ' >
      <div className='mx-auto'>Profile pic</div>
      <div className=' border border-solid border-gray-400 m-auto rounded-full w-32 h-32'>       
      <label htmlFor="avatar">     
            <input type="file" id='avatar' accept='image/*' hidden onChange={(e)=>handleprofile(e)}/>
            <Avatar src={Profile_pic} alt='profile' className='mx-2 my-2 cursor-pointer' size='xxl' variant='circular'/>
        </label>
      </div>  
      <div className='my-auto mx-3 p-2'>      
      <Input label="Phone Number" size="lg" variant='standard' defaultValue={Phone_number} readOnly/>
      </div>
      <div className='my-auto mx-3 p-2'>      
      <Input label="Name" size="lg" variant='standard' defaultValue={Name}  onChange={(e)=>setName(e.target.value)} required/>
      </div>
      <div className='mx-auto my-7'>
        <Button onClick={(e)=>submitData(e)}>
          UPDATE
        </Button>
      </div>
    </Card>
    </div>
  )
}

export default Profile