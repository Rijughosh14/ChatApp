import { Avatar, Card, Input, Button } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import camera from '../../Asset/camera.png'
import { UserContext } from '../../hooks/context'
import { toast } from 'react-toastify';
import { signup, image_upload } from '../../services/userService'


const Signup = ({ number }) => {

  const navigate = useNavigate()
  const [Phone_number, setPhonenumber] = useState('')
  const [Name, setName] = useState('')
  const [Profile_pic, setProfile_pic] = useState(camera)
  const [Profile, setProfile] = useState(camera)
  const{dispatch}=useContext(UserContext)

  useEffect(() =>{
    setPhonenumber(number)
  }, [number])

  const submitData = async (e) => {
    try {
      const response = await image_upload(Profile)
      dispatch({type:'SET_USER',payload:{user:Name,number:Phone_number,profile_pic:response,loggedIn:true}})
       await signup(Phone_number,Name,response)
       toast.success('sign up successfuly')
       navigate('/home')  
    } catch (error) {
      console.log(error)
      toast.error('sign up unsuccessful')
    }
  }

  const handleProfile=(e)=>{
    setProfile(e.target.files[0])
    setProfile_pic(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='flex flex-col bg-blue-gray-500 h-screen w-full'>
      <Card className=' m-auto gap-2 relative h-96 w-96 ' encType="multipart/form-data" >
        <div className='mx-auto'>Profile pic upload</div>
        <div className=' border border-solid border-gray-400 m-auto rounded-full w-32 h-32'>
          <label htmlFor="file">
            <input type="file" id='file' name='file' hidden onChange={(e) => handleProfile(e)} accept='image/*' />
            <Avatar src={Profile_pic} className='mx-2 my-2 cursor-pointer' size='xxl' variant='circular' />
          </label>
        </div>
        <div className='my-auto mx-3 p-2'>
          <Input label="Phone Number" size="lg" variant='standard' value={Phone_number} readOnly />
        </div>
        <div className='my-auto mx-3 p-2'>
          <Input label="Name" size="lg" variant='standard' value={Name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className='mx-auto my-7'>
          <Button onClick={(e) => submitData(e)}>
            DONE
          </Button>
        </div>
      </Card>
    </div>

  )
}

export default Signup