import {
  Card,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from 'react'
import ImageView from "../../../../component/Partials/ImageView";
import { getUserSession } from "../../../../services/userService"

function Messagebox({ msg, id, img }) {

  const [link, setlink] = useState('')

  const assignimg = (e) => {
    setlink(e.target.src)
  }

  const removeimg = () => {
    setlink('')
  }


  return (
    link === '' ?
      getUserSession().user === id ?
        <div className="my-3  flex flex-row-reverse max-w-screen-lg  ">
          <Card className=" p-3  text-justify box-content max-h-fit max-w-[50%] min-h-fit text-black" id="card">
            {img && <img src={img} alt="" className="hover:cursor-pointer" onClick={(e) => assignimg(e)} />
            }
            {msg && <Typography className="break-words">
              {msg}
            </Typography>}
          </Card>
        </div>
        :
        <div className="my-3  flex flex-row max-w-screen-lg ">
          <Card className=" p-3  text-justify box-content max-h-fit max-w-[50%] min-h-fit text-white  bg-gray-600" >
            {img && <img src={ img} alt="" className="hover:cursor-pointer" onClick={(e) => assignimg(e)} />
            }
            {msg && <Typography className="break-words">
              {msg}
            </Typography>}
          </Card>
        </div>
      :
      <div className='top-0 left-0 right-0 z-10 bg-opacity-50 bg-white'>
        <ImageView link={link} callback={removeimg} />
      </div>
  )
}



export default Messagebox