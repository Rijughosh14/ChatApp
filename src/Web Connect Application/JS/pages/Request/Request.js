import { Card } from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { Friend_Request,getUserSession } from '../../services/userService';
import RequestBody from './RequestBody';
import friendRequest from '../../Asset/friendRequest.svg'
   
  export const Request=() =>{
    const [data,setData]=useState([])

    //clearing the friend request data
    const clearData=(id)=>{
      getdata()
    }

    //on initial rendering
    useEffect(()=>{
      getdata()
    },[])

    //getting friend request data
    const getdata=async()=>{
      const data= await Friend_Request(getUserSession().user)
      setData(data)
    } 



    return (
      <>
      <div className='h-screen bg-blue-100 flex flex-row'>
      <div className='h-full  '>
         <Card className="w-96 h-5/6 flex justify-center  mt-1 mx-2 overflow-auto">
             <div className="py-3 px-6 border-b text-center border-gray-300 font-bold">
                Friend Request
            </div>
            <div className="p-6 h-full flex flex-col gap-2">
            {
              data.map((data)=>{
                return (
                  <RequestBody key ={data.id} id={data.id} name={data.name} number={data.phone_number} clearData={clearData}/>
                  )
              })
            }
            </div>
          </Card>
      </div>

      <div className='w-full'>
        <div>
        <img src={friendRequest} alt="request" className='h-96 w-5/6 m-auto mt-9'/>
        </div>
      </div>
      </div>
      </>
    );
  }
