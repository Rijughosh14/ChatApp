import React, { useState,useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import firebase from '../../services/FirebaseService';
import homebg from '../../Asset/Homebg.svg'
import TypedStrings from './component/Typed.js';

 
export default function Login({callback}) {
  const ref=useRef()
  const [Phone_number,set_number]=useState('')
  const [phone,setPhone]=useState('')
  const [otp,setOtp]=useState('')
  const [loading,setLoading]=useState(false)
  const [recaptcha, setRecaptcha] = useState(null);
  const [result,setResult]=useState('')
  const[display,setdisplay]=useState(false)

  useEffect(() => {
    let _recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha', {
      size: 'invisible',
    });
    setRecaptcha(_recaptcha);
    ref.current.focus();
  }, []);

  useEffect(()=>{
    setPhone('+91'+Phone_number)
  },[Phone_number])

  const sendOtp = async (recaptcha) => {
    try {
      setLoading(true)
      let confirmationResult =await toast.promise(
        firebase.auth().signInWithPhoneNumber(phone,recaptcha),
        {
          pending: 'Sending Otp',
          success: 'Otp Sent 👌',
          error: 'Otp Cancelled 🤯'
        }
    );
      setResult(confirmationResult)
      setLoading(false)
      setdisplay(true)

    } catch (err) {
      console.log(err)
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      if (otp === '') {
        toast('enter a otp')
        return;
      }
       await toast.promise(
        result.confirm(otp),
        {
          pending: 'Verifying Otp',
          success: 'Otp verified 👌',
          error: 'Otp is wrong 🤯'
        }
        )
        callback({ token: 1, Phone_number }, undefined)
    } catch (err) {
      callback(undefined, 'OTP verification failed!');
      setLoading(false)
      setOtp('')
    }
  };

  const submitData=(e)=>{
      e.preventDefault()
      if(Phone_number.length===0||Phone_number.length<10){
        toast('enter a valid number')
        return
      }
      try {
        setLoading(true)
        sendOtp(recaptcha);
      } catch (error) {
        setLoading(true)
        console.log(error)
      }
  }

  return (
  <>
  <div id="recaptcha"></div>
<div className="antialiased bg-gradient-to-br from-blue-100 to-white">
    <div className="container px-6 mx-auto relative">
      <div className="absolute top-2 left-0">
      <h1 className="text-3xl text-gray-800 font-serif">কথা</h1>
      </div>
      <div className="absolute top-16  w-full right-0 flex justify-center">
        <p className="text-centre mx-auto md:mx-0 text-gray-800 text-3xl italic">
        <TypedStrings
									strings={[
										'<span>Welcome To <strong>Kathā.</strong></span>',
										'<span>Embrace Conversations with Kathā.</span>',
										'<span><strong >Join Now.</strong></span >',
										'<span><strong>Connect</strong> to your friends and families.</span >',
									]}
								/>
          </p>
      </div>
      <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center">
        <div className="flex flex-row w-full">
          <div className="">
            <img src={homebg} alt="homebg.svg" className="w-96 h-96"/>
          </div>
        </div>
        <div className="w-full md:w-full lg:w-9/12 mx-auto md:mx-0">
          {/* login form */}
          {!display &&<div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-2">
              Login
            </h2>
            <form action="" className="w-full" onSubmit={(e) => submitData(e)}>
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="username" className="text-gray-700 mb-5"
                  >Phone Number</label>
                <input
                  type={'number'} 
                  placeholder="Enter your phone number"
                  value={Phone_number} 
                  onChange={(e) => set_number(e.target.value)} 
                  ref={ref}
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:shadow-lg"
                />
              </div>
              <div id="button" className="flex flex-col w-full my-5">
                <button
                  type="button"
                  className="w-full py-4 bg-blue-600 rounded-lg text-white" 
                  disabled={loading&&loading}
                  onClick={submitData}
                >
                  
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                        ></path>
                      </svg>
                    </div>
                    <div className="font-bold">Generate Otp</div>
                  </div>
                </button>
              </div>
            </form>
          </div>}


          {/* otp form */}
          {display &&<div className="bg-white p-10 flex flex-col w-full shadow-xl rounded-xl">
            <h2 className="text-2xl font-bold text-gray-800 text-left mb-5">
              Sigin
            </h2>
            <form action="" className="w-full" onSubmit={(e) => verifyOtp(e)}>
              <div id="input" className="flex flex-col w-full my-5">
                <label htmlFor="otp" className="text-gray-500 mb-2"
                  >OTP</label>
                <input
                  id="otp"
                  placeholder="Please insert your otp" 
                  type={'number'} 
                  value={otp} 
                  onChange={(e) => setOtp(e.target.value)}
                   ref={ref}
                  className="appearance-none border-2 border-gray-100 rounded-lg px-4 py-3 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:shadow-lg"
                />
              </div>
              <div id="button" className="flex flex-col w-full my-5">
                <button
                  type="button" 
                  disabled={loading&&loading}
                  className="w-full py-4 bg-blue-600 rounded-lg text-white"
                  onClick={verifyOtp}
                >
                  <div className="flex flex-row items-center justify-center">
                    <div className="mr-2">
                    </div>
                    <div className="font-bold">Verify Otp</div>
                  </div>
                </button>
              </div>
            </form>
          </div>}
        </div>
      </div>
    </div>
  </div>
  </>
  );
}