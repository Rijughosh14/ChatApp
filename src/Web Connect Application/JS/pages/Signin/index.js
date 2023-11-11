import React, { useContext, useState } from 'react'
import Signup from '../Signup/Signup'
import Login from './Login'
 import { userExistence,login } from '../../services/userService'
 import {useNavigate} from "react-router-dom"
import { UserContext } from '../../hooks/context'

const Index = () => {
    const [signup,setsignup]=useState(false)
    const [userId,setid]=useState(false)
    const [userPhone,setUserphone]=useState('') 
    const {dispatch}=useContext(UserContext)

    const navigate=useNavigate();

  //verify function
    const verify=async(data,error)=>{
      
      if(error!==undefined) return

      const {Phone_number,token}=data;


      if(token===''||token===undefined){
        
        return
      }
      
      setUserphone(Phone_number)
      setid(token)
      

      try {
        
        const userexistence=await userExistence(Phone_number)
        if(userexistence.exist){
          const loginUser=await login(Phone_number)
          dispatch({ type: 'SET_USER', payload: { user: loginUser[0].name, loggedIn: true,number:loginUser[0].phone_number,profile_pic:loginUser[0].profile_pic } });
         navigate('/home')
         return
        }
        setsignup(true)
        
      } catch (error) {
        console.log(error)
      }

    }

  return (
    <>
    {!userId&&(<Login callback={verify}/>)}
    {signup&&(<Signup number={userPhone} id={userId}/>)}
    </>
  )
}

export default Index