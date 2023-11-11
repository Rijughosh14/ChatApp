import { Avatar } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import camera from '../Asset/camera.png'

 
export default function Variants({link}) {
  const [Link,SetLink]=useState(null)

  useEffect(()=>{
    SetLink(link)
  },[link])

  return (
     <div className="flex">
      {Link!==null&&<Avatar src={(Link!==' '&&Link!=='')?process.env.REACT_APP_IMAGE_URL+Link:camera} size="sm" alt="avatar" variant="circular" /> }
    </div>
  );
}  