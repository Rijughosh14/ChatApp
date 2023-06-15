import {
    Button,
    Dialog,
    DialogHeader,
    DialogFooter,
  } from "@material-tailwind/react";
import React, { useContext, useState } from 'react'
import { Link,useNavigate } from "react-router-dom";
import { UserContext } from "../../hooks/context.js";
import {logout} from '../../services/userService.js'

function Logout() {

    const [open, setOpen] = useState(true);
    const navigate=useNavigate()
    const{dispatchChat}=useContext(UserContext)
 
  const handleOpen = async(e) => {
    e.preventDefault()
    setOpen(!open)
    await logout()
    dispatchChat({type:'LOGOUT'});
    navigate('/')
  };
  return (
    <>
      <Dialog open={open} className='flex flex-col'>
        <DialogHeader className="m-auto">Are you sure you want to logout?</DialogHeader>
        <DialogFooter>
        <Link to={'/home'}>
          <Button
            variant="text"
            color="red"
            className="mr-1"
          >            
            <span>Cancel</span>          
          </Button>
          </Link>
          <Button variant="gradient" color="green" onClick={(e)=>handleOpen(e)}>          
            <span>Confirm</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  )
}

export default Logout