import {
  Card,
  CardHeader,
  CardBody,
  Typography,
} from "@material-tailwind/react";
import Chatcomponent from "../Home/component/chatcomponent";
import SearchBar from "../../component/searchbar";
import { useEffect, useState } from "react";
import { Friend_List, getUserSession } from "../../services/userService";
 
export default function Newchat() {

  const [data,setData]=useState([])
  const [temp,setTemp]=useState([])

    useEffect(()=>{
      getdata()
    },[])

    const verify=(value)=>{
      const newlist=temp.filter(checklist)
      function checklist(temp){
        return JSON.stringify(temp).toLowerCase().includes(value)
      }
      setData(newlist)
    }

    const getdata=async()=>{
      const data= await Friend_List(getUserSession().user)
      setData(data)
      setTemp(data)
    } 

  return (
    <>
    <div className="bg-blue-50">
    <Card className="w-96 h-screen bg-blue-50">
      <CardHeader
        variant="gradient"
        className=" grid h-8 place-items-center bg-[#1da1f2]"
        floated={false}
      >
        <Typography variant="h5" color="white">
          New Chat
        </Typography>
      </CardHeader>
      <CardBody className="">
        <SearchBar callback={verify}/> 
        {
              data.map((data)=>{
                return (
                  <>
                  <Chatcomponent key ={data.id}id={data.id} name={data.name} set={1} profile={data.profile_pic}/>
                  <hr/>
                  </>
                  )
              })
            }
      </CardBody>
    </Card>
    </div>
    </>

  );
}