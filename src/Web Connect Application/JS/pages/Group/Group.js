import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { RxCross2 } from "react-icons/rx";
import { useContext, useEffect, useState } from "react";
import { create_group, Friend_List, getUserSession, image_upload } from "../../services/userService";
import Avatars from "../../component/Avatar";
import camera from '../../Asset/camera.png'
import { UserContext } from "../../hooks/context";
import { toast } from "react-toastify";


export default function Group() {

  const [data, setData] = useState([])
  const [groupname, setgroupname] = useState('')
  const [Profile_pic, setProfile_pic] = useState(camera)
  const [Profile, setProfile] = useState('')
  const { state } = useContext(UserContext)
  useEffect(() => {
    getdata()
  }, [])

  const [list, setlist] = useState([])

  const getdata = async () => {
    const data = await Friend_List(getUserSession().user)
    setData(data)
  }

  //set group profile_pic
  const handleprofile = (e) => {
    setProfile(e.target.files[0])
    setProfile_pic(URL.createObjectURL(e.target.files[0]))
  }

  //set group list
  const setgrouplist = (id, name) => {
    if (JSON.stringify(list).includes(id)) return
    setlist((list) => [...list, {
      id: id,
      name: name
    }])
  }
  //delete group list
  const deletelist = (delete_id) => {

    function checklist(list) {
      return list.id !== delete_id
    }
    
    const newlist = list.filter(checklist)
    
    setlist(newlist)
  }

  // handle group data
  const handledata = async (e) => {
    e.preventDefault()
    if (groupname === '' || list.length === 0) {
      toast.error('Group invalid')
      return
    }
    const newlist = [...list, {
      id: getUserSession().user,
      name: state.user
    }]
    setlist([])
     const response=await image_upload(Profile)
    await create_group(newlist, groupname,response)
    .then(
      setProfile_pic(camera),
      setgroupname(''))
      toast.success('group created successfuly')
  }

  return (
    <>
      <div className="flex h-full">
        <Card className=" flex w-96 relative gap-1">
          <CardHeader
            variant="gradient"
            color="blue"
            className=" grid h-8 place-items-center bg-[#1da1f2]"
            floated={false}
          >
            <Typography variant="h5" color="white">
              New Group
            </Typography>
          </CardHeader>
          <CardBody className="gap-4 flex flex-col max-h-4/5 overflow-auto">
            <div className="m-auto">
              <div className="border border-solid rounded-full border-gray-200 h-32 w-32">
                <label htmlFor="avatar">
                  <input type="file" id='avatar' accept='image/*' hidden onChange={(e) => handleprofile(e)} />
                  <Avatar src={Profile_pic} alt='profile' className='mx-2 my-2 cursor-pointer' size='xxl' variant='circular' />
                </label>
              </div>
            </div>
            <div>
              <Input variant="standard" label={"Group Name"} color={"blue"} value={groupname} onChange={(e) => setgroupname(e.target.value)} />
            </div>
            <div className="h-16 w-19/20 border border-solid border-gray-400 border-x-white border-t-white gap-2 flex overflow-x-auto">
              {
                list.map((list) => {
                  return (
                    <div className="rounded-full flex w-14 h-14 relative bg-gray-100" key={list.id}>
                      <div className="absolute -right-0">
                        <button onClick={() => deletelist(list.id)}><RxCross2 /></button>
                      </div>
                      <p className="m-auto overflow-hidden text-blue-200">
                        {list.name.split(' ')[0]}
                      </p>
                    </div>
                  )
                })
              }
            </div>
            <div className="flex flex-col max-h-80 overflow-auto ">
              {
                data.map((data) => {
                  return (
                    <div key={data.id} className='border-solid  border-lime-100' id={data.id} onClick={() => setgrouplist(data.id, data.name)}>
                      <div className='flex flex-row gap-2 p-2 hover:bg-blue-gray-100 hover:text-white
                    hover:rounded-lg m-1 hover:cursor-pointer'  >
                        <div className='mx-2' >
                          <Avatars link={data.profile_pic} />
                        </div>
                        <div className=' w-3/4 h-14' >
                          <h3>
                            <b>
                              {data.name}
                            </b>
                          </h3>
                        </div>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </CardBody>
          <CardFooter className="absolute inset-x-0 bottom-0 ">
            <Button color="blue" fullWidth onClick={(e) => handledata(e)}>
              Create
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}