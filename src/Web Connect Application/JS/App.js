import React, { useEffect, useReducer, useState } from 'react'
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from './pages/Home/home';
import Header from './component/Partials/Header';
import Newchat from './pages/New Chat/newChat';
import Logout from './pages/logout/logout';
import AddContact from './pages/Contact/addContact';
import Index from './pages/Signin';
import Profile from './pages/Profile/Profile';
import Group from './pages/Group/Group';
import VideoChat from './pages/Call_Connection/videoCall';
import { Privatecall, Privatecaller } from './pages/Call_Connection/component/Privatecall';
import VideoIncoming from './pages/Call_Connection/VideoIncoming';
import axios from 'axios'
import { Privatelogin, PrivateRoute } from './component/PrivateRoute';
import { getUserSession, get_Group, setCallercookie, userProfile } from './services/userService';
import { UserContext } from './hooks/context';
import { authReducer, initialState } from './reducers/AuthReducers';
import { Request } from './pages/Request/Request';
import { initialChatState, authChatReducer } from './reducers/ChatAuthreducer';
import { CallReducer, initialCallstate } from './reducers/CallReducer';
import { socket } from './Socket/Socket';
import Call from './pages/Call_Connection/Call';
import CallIncoming from './pages/Call_Connection/CallIncoming';
import About from './pages/About/About';
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL


function App2() {
  const [state, dispatch] = useReducer(authReducer, initialState)
  const [Chatstate, dispatchChat] = useReducer(authChatReducer, initialChatState)
  const [Callstate, dispatchCall] = useReducer(CallReducer, initialCallstate)
  const [group, SetGroup] = useState([])
  const [data, SetData] = useState([])
  const navigate = useNavigate()

  useEffect(()=>{
        const result =  getUserSession()
      SetData(result)
  },[])

  useEffect(() => {
    data.status && userProfile(data.user).then((data) => dispatch({ type: 'SET_USER', payload: { user: data.name, number: data.phone_number, profile_pic: data.profile_pic, loggedIn: true } }))
    data.status && getdata()
  }, [ Callstate,data])

  useEffect(() => {
    if (group.length !== 0) {
      socket.emit('groupdata', {
        Data: group
      })
    }
    return () => {
      socket.emit("leave_room", {
        Data: group
      });
    };
  }, [group])

  useEffect(() => {
    socket.on('video-call-incoming', (data) => {
      const { caller } = data;
      setCallercookie(caller)
      navigate(`/videoincoming?q=${caller}`)    })
  })

  useEffect(() => {
    socket.on('call-incoming', (data) => {
      const { caller } = data;
      setCallercookie(caller)
      navigate(`/callincoming?q=${caller}`) })
  })


  const getdata = async () => {
    const result = await get_Group(getUserSession().user)
    SetGroup(result)
  }


  return (
    <>
      <UserContext.Provider value={{ state, dispatch, Chatstate, dispatchChat, Callstate, dispatchCall }}>
        <Routes>
          <Route index element={<Privatelogin><Index /></Privatelogin>} />
          <Route path='/about' element={<About />} />
          <Route path='/logout' element={<PrivateRoute><Logout /></PrivateRoute>} />
          <Route path='/videochat' element={<PrivateRoute><Privatecall><VideoChat /></Privatecall></PrivateRoute>} />
          <Route path='/call' element={<PrivateRoute><Privatecall><Call /></Privatecall></PrivateRoute>} />
          <Route path='/videoincoming' element={<PrivateRoute><Privatecaller><VideoIncoming /></Privatecaller></PrivateRoute>} />
          <Route path='/callincoming' element={<PrivateRoute><Privatecaller><CallIncoming /></Privatecaller></PrivateRoute>} />
          <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/addcontact" exact element={<PrivateRoute><AddContact /></PrivateRoute>} />
          <Route path="/request" exact element={<PrivateRoute><Request /></PrivateRoute>} />
          <Route path='/' element={<PrivateRoute><Header /></PrivateRoute>}>
            <Route path="/home" exact element={<PrivateRoute><Home /></PrivateRoute>} />
            <Route path="/group" exact element={<PrivateRoute><Group /></PrivateRoute>} />
            <Route path="/newchat" exact element={<PrivateRoute><Newchat /></PrivateRoute>} />
          </Route>
        </Routes>
      </UserContext.Provider>
    </>
  )
}

export default App2