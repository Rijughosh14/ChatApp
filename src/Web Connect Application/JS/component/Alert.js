import { useState, useEffect } from "react";
import { Alert } from "@material-tailwind/react";
 
export default function AlertMessage({error}) {
  const [show, setShow] = useState(true);
  useEffect(()=>{
    setTimeout(()=>{
        setShow(false)
    },2000)
  })
 
  return (
    
      <Alert
        show={show}
        animate={{
            mount: { y: 0 },
            unmount: { y: 100 },
          }}
        className='w-1/2 m-auto'
      >
        {error}
      </Alert>
  );
}