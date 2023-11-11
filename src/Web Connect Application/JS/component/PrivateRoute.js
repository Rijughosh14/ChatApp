import React from 'react'
import { Navigate } from 'react-router-dom'
 import { getUserSession } from '../services/userService'


export const PrivateRoute = ({children}) => {
   
  const data=getUserSession().status

  return (
    data?children:<Navigate to='/' replace/>
  );
}

export const Privatelogin=({children})=>{

  const data=getUserSession().status
  
    return(
      data?<Navigate to='/home' replace/>:children
    )
}



