import React, { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '../../hooks/context'
import { FcEndCall } from 'react-icons/fc'
import { BsMic, BsMicMute } from 'react-icons/bs'
import { getUserSession } from '../../services/userService'
import { socket } from '../../Socket/Socket'
import { MediaPeer, disconnection, toggleaudio, microphonePermission } from './component/useMedia'
import { Receiverpeer } from './component/Peer'
import { useLocation, useNavigate } from 'react-router-dom'
import { IoMdCall } from 'react-icons/io'
import { toast } from 'react-toastify'
let mediastream;

const CallIncoming = () => {
    const userid = getUserSession().user
    const peerRef = useRef();
    const friendRef = useRef();
    const [Name, setName] = useState(null)
    const [media, setMedia] = useState(null)
    const [signal, setsignal] = useState(null)
    const [status, setStatus] = useState(false)
    const [message, setmessage] = useState("incoming...")
    const [mic, setMic] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()
    const { Chatstate, Callstate, dispatchCall } = useContext(UserContext)
    const user = parseInt(new URLSearchParams(location.search).get('q'))

    useEffect(() => {
        // const handleBeforeUnload = () => {
        //     disconnection(mediastream,peerRef)
        //     //close event
        //     socket.emit('close', { callee: user,caller:userid })
        //     //turning off all the socket event
        //     socket.off()
        //     //setting call state
        //     dispatchCall({type:'DISCONNECT'})
        //     //navigating back to home page
        //     navigate('/')
        //   };

        //   window.addEventListener('beforeunload',handleBeforeUnload)

        if (!media) {
            const storedstream = Callstate.Media
            const storedFstream = Callstate.FriendMedia
            const storedpeer = Callstate.Peer
            if (storedstream) {
                mediastream = storedstream
                setMedia(storedstream)
                peerRef.current = storedpeer
                if (Callstate.Status === "connected") {
                    setStatus(true)
                    friendRef.current.srcObject = storedFstream
                }
                else {
                    friendRef.current.srcObject = storedstream
                    mediastream = storedstream
                    setmessage(Callstate.Status)
                    setStatus(false)
                }
            }
            else {
                socket.on('signal', data => {
                    const { signalingData, name } = data
                    setName(name)
                    if (JSON.parse(signalingData).type === 'offer') {
                        setsignal(JSON.parse(signalingData))
                    }
                });
                MediaPeer()
                    .then((stream) => {
                        setMedia(stream)
                        mediastream = stream
                        const peer = Receiverpeer(stream)
                        peerRef.current = peer;
                        //setting call details
                        dispatchCall({ type: 'SET_CALL', payload: { Media: stream, Peer: peer, callee: userid, caller: user, Status: 'incoming...', Signal: signal, callerName: Name } })

                        peer.on('signal', data => {
                            // send the signal data to the other peer
                            socket.emit('signal', { signalingData: JSON.stringify(data), callee: user, caller: userid });
                        });
                        peer.on('stream', stream => {
                            dispatchCall({ type: 'UPDATE_STATUS', payload: { Status: 'connected' } })
                            dispatchCall({ type: 'UPDATE_FMEDIA', payload: { FriendMedia: stream } })
                            // display the remote stream in the video element
                            friendRef.current.srcObject = stream
                            friendRef.current.play()
                        });
                        peer.on('data', data => {
                            const message = JSON.parse(data);
                            if (message.type === 'toggleMic') {
                                // turn off remote mic
                                if (message.value) {
                                    toggleaudio(media)
                                } else {
                                    toggleaudio(media)
                                }
                            }
                        });
                        socket.on('offline', () => {
                            setmessage("offline")
                            dispatchCall({ type: 'UPDATE_STATUS', payload: { Status: 'offline' } })
                        });
                        socket.on('close', () => {
                            //stopping media and destroy peer
                            disconnection(mediastream, peerRef)
                            socket.off()
                            //deleting peer
                            delete peerRef.current;
                            //setting call state
                            dispatchCall({ type: 'DISCONNECT' })
                            //navigating back to home page
                            navigate('/')
                          })
                    })
                    .catch(error => {
                        console.error('Error  ', error);
                    });
            }
        }
        // return()=>{
        //     window.removeEventListener('beforeunload',handleBeforeUnload)
        // }
    }, [media, Callstate, dispatchCall, Chatstate, userid, navigate, status, user, Name, signal]);

    //mic enable function
    const micEnable = useCallback(() => {
        toggleaudio(media)
        setMic(!mic)
        const message = { type: 'toggleMic', value: mic };
        peerRef.current.send(JSON.stringify(message));
    }, [mic, media])

    //disconnect call
    const disconnect = useCallback(() => {
        disconnection(mediastream, peerRef)
        //close event
        socket.emit('close', { callee: user, caller: userid })
        //turning off all the socket event
        socket.off()
        //setting call state
        dispatchCall({ type: 'DISCONNECT' })
        //navigating back to home page
        navigate('/')
    }, [navigate, dispatchCall, user, userid])


    //call connect function
    const call = useCallback(async () => {
        const result = await microphonePermission()
        if (result === 'granted') {
            // Microphone permission has been granted   
            peerRef.current.signal(signal); // receive the signal data from the signaling server and send it to the other peer
            setStatus(true)
        }
        else if (result === 'denied') {
            // Microphone permission has been denied
            toast.error("Microphone Permission Denied")
        } else {
            // Permission status is 'prompt' or 'unknown'
            MediaPeer()
                .then(() => {
                    peerRef.current.signal(signal); // receive the signal data from the signaling server and send it to the other peer
                    setStatus(true)
                })
        }
    }, [signal])

    return (
        <div className='flex relative  h-screen w-full bg-brown-400'>
            <video ref={friendRef} className='  h-full w-full object-cover ' autoPlay ></video>
            <div className=' absolute text-black text-xl top-1/2 left-1/2 font-bold'>
                {!status && message + Name}
            </div>
            {status && <div className='absolute bottom-6 left-1/3 h-16 w-fit flex flex-row place-items-center space-x-14 rounded-lg bg-blue-gray-100 p-4'>
                <div>
                    <button onClick={micEnable}>
                        {mic ? <BsMic size={'30px'} /> : <BsMicMute size={'30px'} />}
                    </button>
                </div>
                <div>
                    <button onClick={disconnect}>
                        {<FcEndCall size={'30px'} />}
                    </button>
                </div>
            </div>}
            {!status && <div className='absolute bottom-6 left-1/3 h-16 w-fit flex flex-row place-items-center space-x-14 rounded-lg bg-blue-gray-100 p-4'>
                <div>
                    <button onClick={call}>
                        <IoMdCall size={'30px'} />
                    </button>
                </div>
                <div>
                    <button onClick={disconnect}>
                        <FcEndCall size={'30px'} />
                    </button>
                </div>
            </div>}
        </div>
    );
}
export default CallIncoming