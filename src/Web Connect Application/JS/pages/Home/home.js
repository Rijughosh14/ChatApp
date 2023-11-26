import {
  Card,
} from "@material-tailwind/react";
import Chatcomponent from "./component/chatcomponent";
import Navbar from "../../component/navbar";
import SearchBar from "../../component/searchbar";
import {  useEffect, useState } from "react";
import { chat_component, getUserSession,get_lastGroupMessage,get_last_message } from "../../services/userService";
import { socket } from "../../Socket/Socket";

export default function Home() {
  let x = 0;
  const [data, setdata] = useState([])
  const [temp, setTemp] = useState([])
  const [Noti, setNoti] = useState([])

  useEffect(() => {
    getdata()
    socket.on("received_refresh_chat", () => {
      getdata()
    })
    const result=getUserSession().user
     socket.emit('user_connection',result)
    return ()=>socket.off('received_refresh_chat')
  }, [])


  //listening normal message event
  // useEffect(() => {
  //   socket.on("notification_message", (Data) => {
  //     console.log(Noti)
  //     const newarray = Noti.map((Noti) => {
  //       if (Data.sender_id === Noti.id && Chatstate.id !== Data.sender_id) {
  //         return { ...Noti, len: 1 }
  //       }
  //       else {
  //         return Noti
  //       }
  //     })
  //     setNoti(newarray)
  //   })

  //   return ()=>socket.off('notification_message')
  // }, [Noti,Chatstate])



  //     //listening group message event
  // useEffect(() => {
  //   socket.on("group_notification_message", (Data) => {
  //     // console.log("notificatiion",Data)
  //     const newarray = Noti.map((Noti) => {
  //       if (Data.RoomId===Noti.id && Chatstate.id !== Data.RoomId) {
  //         return { ...Noti, len: 1 }
  //       }
  //       else {
  //         return Noti
  //       }
  //     })
  //     setNoti(newarray)
  //   })

  //   return ()=>socket.off('group_notification_message')

  // }, [Noti,Chatstate])


  //filter search option   memo fucntion
  const verify = (value) => {
    const newlist = temp.filter(checklist)
    function checklist(temp) {
      return JSON.stringify(temp).toLowerCase().includes(value)
    }
    setdata(newlist)
  }

  //get home chat component data
  const getdata = async () => {
    const result = await chat_component(getUserSession().user)
    setdata(result)
    setTemp(result)

  }

  useEffect(() => {
    const promises = data.map(async (data) => {
      const notifi = data.id !== 0 ? await get_last_message(getUserSession().user, data.f_id) : await get_lastGroupMessage(data.f_id);
      return {
        id: data.f_id,
        image: notifi[notifi.length - 1] ? notifi[notifi.length - 1].image : "",
        message: notifi[notifi.length - 1] ? notifi[notifi.length - 1].message || notifi[notifi.length - 1].chat : "",
        name: notifi[notifi.length - 1] ? notifi[notifi.length - 1].name : "",
        sender_id: notifi[notifi.length - 1] ? notifi[notifi.length - 1].sender_id : ''
      };
    });
    Promise.all(promises).then((values) => {
      setNoti(values);
    });
  }, [data]);

  return (
    <Card className="h-screen w-96 antialiased bg-gradient-to-b from-blue-50 to-white shadow-2xl">
      <div>
        <Navbar />
      </div>
      <div className="border">
        <SearchBar callback={verify} />
      </div>
      <div className="w-full h-full overflow-auto">
        {
          data.map((data, index) => {
            x = x + 1
            return (
              <Chatcomponent key={x} id={data.f_id} name={data.name} set={data.id} profile={data.profile_pic} number={data.phone_number} notification={Noti[index]} />
            )
          })
        }
      </div>
    </Card>
  );
}