import {
  Card,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from 'react'
import ImageView from "../../../../../component/Partials/ImageView";
import { getUserSession } from "../../../../../services/userService";

function GroupMessagebox({ msg, id, name,img }) {
  const[link,setlink]=useState('')
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  let p
  if (name === '') {
    p = 1
  }
  else {
    p = 3
  }

  const assignimg=(e)=>{
    setlink(e.target.src)
  }
  
  const removeimg=()=>{
    setlink('')
  }

  return (
    link===''?
    getUserSession().user === id ?
      <>
        <div className={`mt-${p} flex flex-row-reverse max-w-screen-lg`}>
          <Card className=" p-3  text-justify box-content max-h-fit max-w-[50%] min-h-fit text-black" >
            {img && <img src={img} alt="" className="hover:cursor-pointer" onClick={(e)=>assignimg(e)}/>
            }
            {msg && <Typography className="break-words">
              {msg}
            </Typography>}
          </Card>
        </div>
      </> :
      <>
        <div className={`mt-${p}  flex flex-row max-w-screen-lg `}>
          <Card className=" p-3  text-justify box-content max-h-fit max-w-[50%] min-h-fit bg-gray-200 flex flex-col text-black" >
            <div className="font-serif font-bold" style={{ color: `rgb(${r},${g},${b})` }}>
              {name}
            </div>
            {img && <img src={img} alt="" className="hover:cursor-pointer" onClick={(e)=>assignimg(e)}/>
            }
            {msg && <Typography className="break-words">
              {msg}
            </Typography>}
          </Card>
        </div>
      </>:
            <div className='top-0 left-0 right-0 z-10 bg-opacity-50 bg-white'>
            <ImageView link={link} callback={removeimg}/>
          </div>
  )
}

export default GroupMessagebox