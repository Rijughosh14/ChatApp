// import { Typography } from '@material-tailwind/react'
import React from 'react'
import Chatbot from '../../Asset/Chatbot.svg'

function PlainChat() {
  return (
    <>
    <div className='flex h-full w-full text-center bg-blue-50' style={{backgroundImage:`url(${Chatbot})`,backgroundRepeat:'no-repeat',backgroundSize:"contain"}}>
            {/* <div className='italic m-auto'>
                <Typography variant="h3" color="white">
                    Click on the profile to start a new chat
                </Typography>
            </div> */}
    </div>
    </>
  )
}

export default PlainChat