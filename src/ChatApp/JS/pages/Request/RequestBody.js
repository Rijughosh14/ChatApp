import React from 'react'
import { Button } from '@material-tailwind/react'
import { handle_request } from '../../services/userService'

const RequestBody = ({id,name,number}) => {

    const handleRequest=async(e,handle)=>{
        e.preventDefault();
        handle_request(e.target.id,handle)
        console.log(e.target.id)
    }
    
  return (
    <div  className='flex flex-col gap-2 border-b m-2 border-gray-300'>
        <div className=''>
            <h2>
                {name}
            </h2>
        </div>
        <div className=''>
                <h2>
                    {number}
                </h2>
        </div>
        <div className='flex flex-row gap-3'>
            <div className=''>
                <Button onClick={(e)=>handleRequest(e,"accept")}  id={id}>Accept</Button>
            </div>
            <div className=''>
            <Button color='red' onClick={(e)=>handleRequest(e,"decline")} id={id}>Decline</Button>
            </div>
        </div>
    </div>
  )
}

export default RequestBody