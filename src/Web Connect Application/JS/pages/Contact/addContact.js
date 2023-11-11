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
    if (number.length === 0 || number === state.number.toString()||number.length>10) {
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
          <h1 className="text-3xl text-gray-800 font-serif">
            <a href="/home">
            কথা
            </a>
          </h1>
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
