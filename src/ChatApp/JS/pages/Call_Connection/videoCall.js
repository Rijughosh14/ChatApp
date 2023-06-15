import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
// import SimplePeer from 'simple-peer';
import {FcNoVideo,FcVideoCall,FcEndCall} from 'react-icons/fc'
import {BsMic,BsMicMute} from 'react-icons/bs'
import { useNavigate } from 'react-router-dom';
import { getUserSession } from '../../services/userService';
import { UserContext } from '../../hooks/context';
import { socket } from '../../Socket/Socket';
import Mediapeer, { disconnection, togglevideo ,toggleaudio} from './component/useMedia';
import { Senderpeer } from './component/Peer';
let mediastream;


const VideoChat=()=> {
  const userid=getUserSession().user
  const videoRef = useRef();
  const peerRef = useRef();
  const friendRef = useRef();
  const [media,setMedia]=useState(null)
  const [video,setVideo]=useState(true)
  const [status,setStatus]=useState(false)
  const [message,setmessage]=useState("connecting.....")
  const [mic,setMic]=useState(true)
  const navigate=useNavigate()
  const {Chatstate,Callstate,dispatchCall,state}=useContext(UserContext)
  useEffect(() => {
    if(!media){
      const storedstream=Callstate.Media
      const storedFstream=Callstate.FriendMedia
      const storedpeer=Callstate.Peer
      if(storedstream){
        mediastream=storedstream
        setMedia(storedstream)
        peerRef.current=storedpeer
       if( Callstate.Status==="connected")
       {setStatus(true)
        videoRef.current.srcObject=storedstream
       friendRef.current.srcObject=storedFstream
        
        }
       else
       {friendRef.current.srcObject=storedstream
        setmessage(Callstate.Status)
        setStatus(false)}
      }
      else{
    Mediapeer()
    .then((stream)=>{
      setMedia(stream)
      mediastream=stream
         friendRef.current.srcObject = stream;
        const peer =Senderpeer(stream)
        peerRef.current = peer;
        peer.on('signal', data => {
          // send the signal data to the other peer
           socket.emit('signal', {signalingData:JSON.stringify(data),callee:Chatstate.id,caller:userid,name:state.user});
             //setting call details
           dispatchCall({type:'SET_CALL',payload:{Media:stream,Peer:peer,caller:userid,callee:Chatstate.id,Status:'connecting....'}})
        });
        peer.on('stream', stream => {
          dispatchCall({type:'UPDATE_STATUS',payload:{Status:'connected'}})
          dispatchCall({type:'UPDATE_FMEDIA',payload:{FriendMedia:stream}})
          // display the remote stream in the video element
          friendRef.current.srcObject=stream;
          videoRef.current&&(videoRef.current.srcObject=mediastream)
          friendRef.current.play()  
        });
        peer.on('data', data => {
          const message = JSON.parse(data);
          if (message.type === 'toggleVideo') {
            // turn off remote video
            if (message.value) {
              // friendRef.current.srcObject = null;
              togglevideo(media)
            } else {
              // friendRef.current.srcObject = Callstate.FriendMedia
              togglevideo(media)
            }
          }
          else if (message.type === 'toggleMic') {
            // turn off remote mic
            if (message.value) {
              toggleaudio(media)
            } else {
              toggleaudio(media)
            }
          }
        });   
        socket.on('signal',data => {
          enable()
           const{signalingData}=data
           peer.signal(JSON.parse(signalingData)); // receive the signal data from the signaling server and send it to the other peer
           dispatchCall({type:'UPDATE_SIGNAL',payload:{Signal:signalingData}})
        });      
        socket.on('offline',()=>{
          setmessage("offline")
          dispatchCall({type:'UPDATE_STATUS',payload:{Status:'offline'}})
        });
        socket.on('close',()=>{  
          disconnection(mediastream,peerRef)
          socket.off()
          //setting call state
          dispatchCall({type:'DISCONNECT'})
          //navigating back to home page
          navigate('/')
        })
      })
      .catch(error => {
        console.error('Error  ', error);
        alert('Error', error)
      });}}
  },[media,Callstate,dispatchCall,Chatstate,userid,status,navigate,state]);

  //enabling my video
  const enable=()=>{
    setStatus(true)
  }

  //video enable function
  const videoEnable = useCallback(() => {
    togglevideo(media)
    setVideo(!video);
    const message = { type: 'toggleVideo', value:video };
    peerRef.current.send(JSON.stringify(message));
  },[video,media])
 
  //mic enable function
  const micEnable=useCallback(()=>{
    toggleaudio(media)   
    const message = { type: 'toggleMic', value:mic };
    peerRef.current.send(JSON.stringify(message));
    setMic(!mic)
  },[mic,media])

  //disconnect call
  const disconnect=useCallback(()=>{  
    disconnection(mediastream,peerRef)
//close event
socket.emit('close',{callee:Chatstate.id,caller:userid})
//turning off all the socket event
socket.off()
//setting call state
dispatchCall({type:'DISCONNECT'})
//navigating back to home page
navigate('/')
  },[Chatstate,navigate,dispatchCall,userid])

  return (
    <div className='flex relative  h-screen w-full bg-brown-400'>
       <video ref={friendRef} className='  h-full w-full object-cover ' autoPlay ></video> 
       <div className=' absolute text-black text-xl top-1/2 left-1/2 font-bold'>
        {!status&&message+""+Chatstate.user}
       </div>
     { status&&<div className='absolute h-1/4 w-1/5 bottom-0 right-0 p-0 border '>
          <video ref={videoRef} className='  h-full w-full object-cover ' autoPlay ></video>
      </div>}
     { status&&<div className='absolute bottom-6 left-1/3 h-16 w-fit flex flex-row place-items-center space-x-14 rounded-lg bg-blue-gray-100 p-4'>
        <div>
          <button onClick={micEnable}>
        {mic?<BsMic size={'30px'}/>:<BsMicMute size={'30px'}/>}
          </button>
        </div>
        <div>
          <button onClick={videoEnable}>
        {video?<FcVideoCall size={'30px'}/>:<FcNoVideo size={'30px'}/>}
          </button>
        </div>
        <div>
          <button onClick={disconnect}>
        {<FcEndCall size={'30px'}/>}
          </button>
        </div>
      </div>}
      {!status && <div className='absolute bottom-6 left-1/3 h-16 w-fit flex flex-row place-items-center space-x-14 rounded-lg bg-blue-gray-100 p-4'>
        <div>
          <button onClick={disconnect}>
            <FcEndCall size={'30px'} />
          </button>
        </div>
      </div>}
    </div>
  );
}

export default VideoChat;
