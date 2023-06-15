import { Card } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Friend_Request,getUserSession } from '../../services/userService';
import RequestBody from './RequestBody';
   
  export const Request=() =>{
    const [data,setData]=useState([])
    useEffect(()=>{
      getdata()
    },[data])

    const getdata=async()=>{
      const data= await Friend_Request(getUserSession().user)
      setData(data)
      // console.log(data)
    } 
    return (
      <div className='h-full bg-gray-400 border '>
         <Card className="w-96 flex justify-center  mt-1 mx-2">
             <div className="py-3 px-6 border-b text-center border-gray-300">
                Friend Request
            </div>
            <div className="p-6 h-full flex flex-col gap-2">
            {
              data.map((data)=>{
                return (
                  <RequestBody key ={data.id}id={data.id} name={data.name} number={data.phone_number}/>
                  )
              })
            }
            </div>
                </Card>
      </div>
    );
  }