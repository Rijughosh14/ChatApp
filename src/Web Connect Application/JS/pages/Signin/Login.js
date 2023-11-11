import React, { useState,useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import firebase from '../../services/FirebaseService';
import homebg from '../../Asset/Homebg.svg'
import TypedStrings from './component/Typed.js';
import heroPic from '../../Asset/heroPic.png'

 
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
    //   let confirmationResult =await toast.promise(
    //     firebase.auth().signInWithPhoneNumber(phone,recaptcha),
    //     {
    //       pending: 'Sending Otp',
    //       success: 'Otp Sent 👌',
    //       error: 'Otp Cancelled 🤯'
    //     }
    // );
    //   setResult(confirmationResult)
      setLoading(false)
      setdisplay(true)

    } catch (err) {
      console.log(err)
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    // try {
    //   setLoading(true)
    //   if (otp === '') {
    //     toast('enter a otp')
    //     return;
    //   }
    //    await toast.promise(
    //     result.confirm(otp),
    //     {
    //       pending: 'Verifying Otp',
    //       success: 'Otp verified 👌',
    //       error: 'Otp is wrong 🤯'
    //     }
    //     )
         callback({ token: 1, Phone_number }, undefined)
    // } catch (err) {
    //   callback(undefined, 'OTP verification failed!');
    //   setLoading(false)
    //   setOtp('')
    // }
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
<div className="antialiased bg-gradient-to-br from-blue-100 to-white relative">
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
      <div className="flex flex-col text-center md:text-left md:flex-row h-screen justify-evenly md:items-center" id="login">
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
  

  {/* about us section */}

<section className="pt-24">
    <div className="px-12 mx-auto max-w-7xl">
        <div className="w-full mx-auto text-left md:w-11/12 xl:w-9/12 md:text-center">
            <h1 className="mb-8 text-4xl font-extrabold leading-none tracking-normal text-gray-900 md:text-6xl md:tracking-tight">
                <span>Start</span> <span className="block w-full py-2 text-transparent bg-clip-text leading-12 bg-gradient-to-r from-blue-400 to-purple-500 lg:inline">building a conversation</span> <span>with others ?</span>
            </h1>
            <p className="px-0 mb-8 text-lg text-gray-600 md:text-xl lg:px-24">
                Start conversations with your friends and familes with ease . Katha to help you doing it.
            </p>
            <div className="mb-4 space-x-0 md:space-x-2 md:mb-8">
                <a href="#login" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg text-white bg-blue-400 rounded-2xl sm:w-auto sm:mb-0">
                    Get Started
                    <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                </a>
                <a href="#offer" className="inline-flex items-center justify-center w-full px-6 py-3 mb-2 text-lg bg-gray-100 rounded-2xl sm:w-auto sm:mb-0">
                    Learn More
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path></svg>
                </a>
            </div>
        </div>
        <div className="w-full mx-auto mt-20 text-center md:w-10/12">
            <div className="relative z-0 w-full mt-8">
                <div className="relative overflow-hidden shadow-2xl">
                    <div className="flex items-center flex-none px-4 bg-blue-400 rounded-b-none h-11 rounded-xl">
                        <div className="flex space-x-1.5">
                            <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                            <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                            <div className="w-3 h-3 border-2 border-white rounded-full"></div>
                        </div>
                    </div>
                    <img src={heroPic} alt="home"/>
                </div>
            </div>
        </div>
    </div>
</section>

{/* what we offer section */}

<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20" id="offer">
  <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
    <div>
      <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-400">
        Brand new
      </p>
    </div>
    <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
      <span className="relative inline-block">
        <svg viewBox="0 0 52 24" fill="currentColor" className="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-blue-gray-100 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block">
          <defs>
            <pattern id="18302e52-9e2a-4c8e-9550-0cbb21b38e55" x="0" y="0" width=".135" height=".30">
              <circle cx="1" cy="1" r=".7"></circle>
            </pattern>
          </defs>
          <rect fill="url(#18302e52-9e2a-4c8e-9550-0cbb21b38e55)" width="52" height="24"></rect>
        </svg>
        <span className="relative">What We Offer.</span>
      </span>
    </h2>
    <p className="text-base text-gray-700 md:text-lg">
    "Experience seamless communication with Katha, a messaging platform designed to keep you connected with your loved ones." </p>
  </div>
  <div className="grid gap-4 row-gap-5 sm:grid-cols-2 lg:grid-cols-3">
    <div className="flex flex-col justify-between p-5 border rounded shadow-md">
      <div>
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
          <svg className="w-12 h-12 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
            <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
          </svg>
        </div>
        <h6 className="mb-2 font-semibold leading-5">Real-Time Messaging</h6>
        <p className="mb-3 text-sm text-gray-900">
        Chatting on Katha is like being in the same room with your friends, thanks to our responsive real-time messaging technology.</p>
      </div>
    </div>
    <div className="flex flex-col justify-between p-5 border rounded shadow-md">
      <div>
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
          <svg className="w-12 h-12 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
            <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
          </svg>
        </div>
        <h6 className="mb-2 font-semibold leading-5">Voice and Video Calls</h6>
        <p className="mb-3 text-sm text-gray-900">
        Katha's voice and video call features ensure that important conversations never feel distant, no matter where you are.   </p>
      </div>
    </div>
    <div className="flex flex-col justify-between p-5 border rounded shadow-md">
      <div>
        <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50">
          <svg className="w-12 h-12 text-blue-400" stroke="currentColor" viewBox="0 0 52 52">
            <polygon strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" points="29 13 14 29 25 29 23 39 38 23 27 23"></polygon>
          </svg>
        </div>
        <h6 className="mb-2 font-semibold leading-5">Group Chats</h6>
        <p className="mb-3 text-sm text-gray-900">
        Create, connect, and collaborate with Katha's group chat feature, where you can bring together friends, family, and colleagues in one shared space.</p>
      </div>
    </div>
  </div>
</div>

{/* how we work section */}

<div className=" relative">
	<div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
		<div className="max-w-3xl mx-auto text-center">
			<h2 className="font-sans text-3xl font-bold sm:text-4xl text-gray-900">How We Works</h2>
		</div>
		<dl className="my-12 space-y-10 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:gap-y-12 lg:grid-cols-4 lg:gap-x-8">
			<div className="flex">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="blue" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-violet-400">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
				</svg>
				<div className="ml-3">
					<dt className="text-lg font-medium  text-blue-400">Sign Up</dt>
					<dd className="mt-2 text-gray-800">To enhance your privacy, we'll send a verification code to your mobile number. Enter the code to confirm your identity and gain access to all of Katha's features.</dd>
				</div>
			</div>
			<div className="flex">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="blue" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-violet-400">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
				</svg>
				<div className="ml-3">
					<dt className="text-lg font-medium text-blue-400">How To Add friends</dt>
					<dd className="mt-2 text-gray-800">If your friends are already on Katha, you can send them a friend request in the add contact option. Once they accept, you'll be connected.</dd>
				</div>
			</div>
			<div className="flex">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="blue" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-violet-400">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
				</svg>
				<div className="ml-3">
					<dt className="text-lg font-medium text-blue-400">Make A Call</dt>
					<dd className="mt-2 text-gray-800">Click a particular button on the top-right side of your friend's chat to make video or voice call. </dd>
				</div>
			</div>
			<div className="flex">
				<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="blue" aria-hidden="true" className="flex-shrink-0 w-6 h-6 text-violet-400">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
				</svg>
				<div className="ml-3">
					<dt className="text-lg font-medium text-blue-400">Create Group</dt>
					<dd className="mt-2 text-gray-800">Katha helps you create a group in the new group option provided.Give group a name ,add a profile pic and select your group members.</dd>
				</div>
			</div>
		</dl>
	</div>
</div>
  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mt-12">
    <footer>
      <p className="text-gray-500">&copy; {new Date().getFullYear()} Riju Ghosh. All Rights Reserved.</p>
    </footer>
  </div>
</div>
  </>
  );
}