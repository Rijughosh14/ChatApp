import { removeCallcookie, removeCallercookie } from "../../../services/userService"

 export const microphonePermission=async()=>{
 const value= await navigator.permissions.query({ name: 'microphone' })
  return value.state
}
 export const cameraPermission=async()=>{
 const value= await navigator.permissions.query({ name: 'camera' })
  return value.state
}

const Mediapeer = () => {
  try {
    const stream = navigator.mediaDevices.getUserMedia({ video: true, audio: true })
  return (stream)
  } catch (error) {
    console.log(error)
  }
  
}

export const MediaPeer = () => {
  try {
    const stream = navigator.mediaDevices.getUserMedia({audio: true,video:false })
    return stream
  } catch (error) {
    console.log(error)
  }
}

export const togglevideo = (media) => {
  if (media) {
    const videoTrack = media.getVideoTracks()[0]
    videoTrack.enabled = !videoTrack.enabled
  }
}

export const toggleaudio = (media) => {
  if (media) {
    const audioTrack = media.getAudioTracks()[0]
    audioTrack.enabled = !audioTrack.enabled
  }
}

export const disconnection = (videoRef, peerRef) => {
  videoRef&&videoRef.getTracks().forEach((track) => {
    track.stop();
  })
  peerRef.current&&peerRef.current.destroy()
  //remove cookie
  removeCallcookie()
  removeCallercookie()
}

export default Mediapeer