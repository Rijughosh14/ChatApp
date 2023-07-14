import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Input,
} from "@material-tailwind/react";
import React, { useState,useEffect, useRef } from "react";
import { toast } from 'react-toastify';
import firebase from '../../services/FirebaseService';

 
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

  const verifyOtp = async () => {
    try {
      setLoading(true)
      // if (otp === '') {
      //   toast('enter a otp')
      //   return;
      // }
      //  await toast.promise(
      //   result.confirm(otp),
      //   {
      //     pending: 'Verifying Otp',
      //     success: 'Otp verified 👌',
      //     error: 'Otp is wrong 🤯'
      //   }
      //   )
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
  <div className="bg-blue-gray-200 h-screen flex flex-col">     
    <Card className="w-96 mx-auto my-auto h-fit">
      <CardHeader
        variant="gradient"
        color="blue"
        className="mb-4 grid h-20 place-items-center"
      >
        <Typography variant="h3" color="white">
          Sign In
        </Typography>
      </CardHeader>

      {/* login form */}
      {!display && (<div><CardBody className="flex flex-col">
        <Input label={'Phone_number'} size="lg" type={'number'} value={Phone_number} onChange={(e) => set_number(e.target.value)} ref={ref}/>
        </CardBody><CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={(e) => submitData(e)} disabled={loading&&loading}>
            Verify
          </Button>
        </CardFooter></div>)}
      

    {/* otp form */}
      {display && (
      <div><CardBody className="flex flex-col">
        <Input size="lg" label={'OTP'} type={'number'} value={otp} onChange={(e) => setOtp(e.target.value)} ref={ref} />
      </CardBody>
      <CardFooter className="pt-0">
          <Button variant="gradient" fullWidth onClick={() => verifyOtp()} disabled={loading&&loading}>
            Verify OTP
          </Button>
        </CardFooter>
        </div>)}
    </Card>
  </div>
  </>
  );
}