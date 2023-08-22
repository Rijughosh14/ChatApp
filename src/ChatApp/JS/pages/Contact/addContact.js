import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react'
import React, { useContext, useState, useEffect, useRef } from 'react'
import { getUserSession, _AddContact, _friendExistence } from '../../services/userService'
import { UserContext } from '../../hooks/context'
import { toast } from 'react-toastify'
import camera from '../../Asset/camera.png'
import contactbg from '../../Asset/contactbg.svg'


// const AddContact = () => {

//   return (
//      <>
//        <div className='h-full bg-blue-gray-100'>
//          <Card className='w-96 flex flex-col h-1/2  gap-4 bg-gray-300'>
//            <div className='mx-auto my-3 border rounded-lg border-gray-400 bg-brown-400 w-32 text-center text-white'>
//              <p>
//                Add Contact
//              </p>
//            </div>
//            <div className='font-bold -mb-4'>
//             <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700"
//             >Search by Number</label>
//           </div>
//           <div className="mb-3  xl:w-90 flex flex-row">
//             <div>
//               <input
//                 type="number"
//                 className="
//                 form-control
//                 block
//                 w-full
//                 px-3
//                 py-1.5
//                 text-base
//                 font-normal
//                 text-gray-700
//                 bg-white bg-clip-padding
//                 border border-solid border-gray-300
//                 rounded
//                 transition
//                 ease-in-out
//                 m-0
//                 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
//               "
//                 defaultValue={number}
//                 onChange={e => setNumber(e.target.value)}
//                 id="Number"
//                 placeholder="Enter 10 digit number"
//               />
//             </div>
//             <div className='mx-2'>
//               <Button onClick={(e) => Searchdata(e)} size='md'>
//                 Search
//               </Button>
//             </div>
//           </div>
//           {data && <div className='border-solid  border-lime-100'>
//             <div className='flex flex-row gap-2 p-2 bg-blue-gray-400 rounded-lg m-1 text-black' >
//               <div className='mx-2' >
//                 <Avatar link={data[0].profile_pic} />
//               </div>
//               <div className=' w-3/4 h-14' >
//                 <h3> 
//                   <b>
//                     {data[0].name}
//                   </b>
//                 </h3>
//               </div>
//               <div className=' m-auto'>
//                 <Button onClick={(e) => submitData(e)} size='sm' color='green'>
//                   +Add
//                 </Button>
//               </div>
//             </div>
//           </div>}
//         </Card>
//       </div>
//      </>
//   )
// }

// export default AddContact

const AddContact = () => {

  const [data, setdata] = useState()
  const [number, setNumber] = useState()
  const { state } = useContext(UserContext)
  const Ref = useRef(null)

  useEffect(() => {
    Ref.current.focus()
  }, [])

  const Searchdata = async (e) => {
    e.preventDefault()
    setdata()
    if (number.length === 0 || number === state.number.toString()) {
      setNumber('')
      toast.error('Enter Valid Number')
      return
    }
    const result = await _friendExistence(number)
    if (result.length !== 0) {
      setdata(result)
    }
    else {
      toast.error("No Result")
    }
  }

  const submitData = async (e) => {
    e.preventDefault();
    const result = await _AddContact(number, getUserSession().user)
    toast(result.data)
    setdata('')
  }

  return (
    <>
      <div className="bg-blue-100 py-20  overflow-hidden relative z-10 h-screen ">
        <div className="absolute top-2 left-2">
          <h1 className="text-3xl text-gray-800 font-serif">কথা</h1>
        </div>
        <div className="container">
          <div className="flex flex-wrap -mx-4 lg:justify-between">

            {/* user card */}
            <div className="w-full px-4 lg:w-1/2 xl:w-6/12 m-auto">
              <div className="mb-12 max-w-[570px] lg:mb-0">
                {!data&&<>
                <div>
                  <img src={contactbg} alt="contactbg" className=' w-5/6'/>
                </div>
                </>}
                {data && <Card className="mt-6 w-96">
                  <CardHeader color="blue-gray" className="relative h-56">
                    <img
                      src={(data[0].profile_pic!==null)?process.env.REACT_APP_IMAGE_URL+data[0].profile_pic:camera}
                      alt="card"
                      className='object-cover h-full w-full'
                    />
                  </CardHeader>
                  <CardBody>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      {data[0].name}
                    </Typography>
                  </CardBody>
                  <CardFooter className="pt-0">
                    <Button onClick={(e) => submitData(e)}>Add</Button>
                    <Button onClick={()=>setdata()} color='red' className='ml-3'>Cancel</Button>
                  </CardFooter>
                </Card>}
              </div>
            </div>


            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="relative p-8 bg-white rounded-lg shadow-lg sm:p-12">
                <form>
                  <div className="mb-6">
                    <input
                      type='number'
                      placeholder={"Friend's Phone Number"}
                      defaultValue={number}
                      ref={Ref}
                      className="border-[f0f0f0] w-full rounded border py-3 px-[14px] text-base text-body-color outline-none focus:border-blue-500 focus-visible:shadow-none"
                      onChange={e => setNumber(e.target.value)}

                    />
                  </div>
                  <div>
                    <button
                      type="submit"
                      className="w-full p-3 text-white transition border rounded border-primary bg-blue-500 hover:bg-opacity-90"
                      onClick={(e) => Searchdata(e)}
                    >
                      Search
                    </button>
                  </div>
                </form>
                <div>
                  <span className="absolute -top-10 -right-9 z-[-1]">
                    <svg
                      width={100}
                      height={100}
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                </div>
                <div>
                  <span className="absolute z-[-1]  -left-10">
                    <svg
                      width={100}
                      height={100}
                      viewBox="0 0 100 100"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className='transform rotate-180'
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                        fill="#3056D3"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddContact
