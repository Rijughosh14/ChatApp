import { Avatar } from "@material-tailwind/react";
import React from "react";
import camera from '../Asset/camera.png'

 
export default function Variants({link}) {
  return (
     <div className="flex">
       <Avatar src={(link!==' '&&link!==null)?process.env.REACT_APP_IMAGE_URL+link:camera} size="sm" alt="avatar" variant="circular" /> 
    </div>
  );
}  