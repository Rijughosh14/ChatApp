import {
    Tabs,
    TabsHeader,
    Tab,
    Typography,
  } from "@material-tailwind/react";

 import Avatar from'./Avatar'
import React, { useContext, useEffect, useState } from "react";
import Dropdown from "./Partials/dropdown";
import { Link } from "react-router-dom";
import { data } from "../data/links";
import { UserContext } from "../hooks/context";

function Navbar() {

  const [profile,setProfile]=useState('')
  const{state}=useContext(UserContext)

  useEffect(()=>{
    setProfile(state.profile_pic)
  },[state.profile_pic])

  return (
  <>
  <div className="bg-blue-50">
    <Tabs value="html" className="w-full">
    <TabsHeader className="h-14 bg-blue-50">
      <div className="w-16 flex m-auto" key={2}>
      <Link to='/profile'>
          <Avatar link={profile}/>
        </Link> 
      </div>
    <div className="mx-10 flex flex-row gap-4">
      {data.map(({ label,link,value }) => (
        <Link key={value} to={link}>
        <Tab key={value} value={value} className='w-12'> 
         <Typography>
         {label}
         </Typography> 
        </Tab>
        </Link>
      ))}
      <div>
        <Tab key={1} value={1}>
          <Dropdown/>
        </Tab>
      </div>
    </div>
    </TabsHeader>
  </Tabs>
  </div>
  </>
  )
}

export default Navbar