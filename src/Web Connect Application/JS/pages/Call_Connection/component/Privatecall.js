import React from 'react'
import { Navigate } from 'react-router-dom'
import { getCallcookie,getCallercookie } from '../../../services/userService'

export const Privatecall = ({children}) => {
    const data=getCallcookie()
  return (
    data?children:<Navigate to={'/home'}/>
  )
}
export const Privatecaller = ({children}) => {
    const data=getCallercookie()
  return (
    data?children:<Navigate to={'/home'}/>
  )
}

