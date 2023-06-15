import { Typography } from '@material-tailwind/react'
import React from 'react'
import chatbg from '../../Asset/chatbg.jpg'

function PlainChat() {
  return (
    <>
    <div className='flex h-full w-full text-center' style={{backgroundImage:`url(${chatbg})`,backgroundRepeat:'no-repeat',backgroundSize:"cover"}}>
            <div className='italic m-auto'>
                <Typography variant="h3" color="white">
                    Click on the profile to start a new chat
                </Typography>
            </div>
    </div>
    </>
  )
}

export default PlainChat