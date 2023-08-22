import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
  } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { getCallcookie } from "../../services/userService";
import { useEffect, useState } from "react";
   
  export default function Dropdown() {
    const [state,Setstate]=useState(null)
    useEffect(()=>{
      const value=getCallcookie()
      Setstate(value)
    },[state])

    
    return (
      <Menu
        animate={{
          mount: { y: 0 },
          unmount: { y: 25 },
        }}
      >
        <MenuHandler>
           <Link><SlOptionsVertical size={'20px'} opacity={'0.90'}/></Link>
        </MenuHandler>
        <MenuList>
           <Link to={'/addcontact'}><MenuItem>Add Contact</MenuItem></Link>
          <Link to={'/group'}><MenuItem>New Group</MenuItem></Link>
{         !state&& <Link to={'/logout'}><MenuItem>Logout</MenuItem></Link>
}        </MenuList>
      </Menu>
    );
  }