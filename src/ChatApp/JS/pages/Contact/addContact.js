import { Card, Button } from '@material-tailwind/react'
import React, { useContext, useState } from 'react'
import { getUserSession, _AddContact, _friendExistence } from '../../services/userService'
import Avatar from '../../component/Avatar.js'
import { UserContext } from '../../hooks/context'
import { toast } from 'react-toastify'


const AddContact = () => {
  const [data, setdata] = useState()
  const [number, setNumber] = useState()
  const {state}=useContext(UserContext)

  const Searchdata = async (e) => {
    e.preventDefault()
    setdata()
    if (number.length === 0 || number===state.number.toString()) {
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
    setNumber('')
    toast(result.data)
    setdata('')
  }

  return (
    <>
      <div className='h-full bg-blue-gray-100'>
        <Card className='w-96 flex flex-col h-1/2  gap-4 bg-gray-300'>
          <div className='mx-auto my-3 border rounded-lg border-gray-400 bg-brown-400 w-32 text-center text-white'>
            <p>
              Add Contact
            </p>
          </div>
          <div className='font-bold -mb-4'>
            <label htmlFor="exampleFormControlInput1" className="form-label inline-block mb-2 text-gray-700"
            >Search by Number</label>
          </div>
          <div className="mb-3  xl:w-90 flex flex-row">
            <div>
              <input
                type="number"
                className="
                form-control
                block
                w-full
                px-3
                py-1.5
                text-base
                font-normal
                text-gray-700
                bg-white bg-clip-padding
                border border-solid border-gray-300
                rounded
                transition
                ease-in-out
                m-0
                focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
              "
                defaultValue={number}
                onChange={e => setNumber(e.target.value)}
                id="Number"
                placeholder="Enter 10 digit number"
              />
            </div>
            <div className='mx-2'>
              <Button onClick={(e) => Searchdata(e)} size='md'>
                Search
              </Button>
            </div>
          </div>
          {data && <div className='border-solid  border-lime-100'>
            <div className='flex flex-row gap-2 p-2 bg-blue-gray-400 rounded-lg m-1 text-black' >
              <div className='mx-2' >
                <Avatar link={data[0].profile_pic} />
              </div>
              <div className=' w-3/4 h-14' >
                <h3>
                  <b>
                    {data[0].name}
                  </b>
                </h3>
              </div>
              <div className=' m-auto'>
                <Button onClick={(e) => submitData(e)} size='sm' color='green'>
                  +Add
                </Button>
              </div>
            </div>
          </div>}
        </Card>
      </div>
    </>
  )
}

export default AddContact