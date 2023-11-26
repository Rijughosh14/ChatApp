import axios from 'axios'
import Cookies from 'js-cookie'
import { _checkUserExist, _login, _signup, _logout, _profile, _update, _addContact, _friends_request, _handleRequest, _friends, _message, _chat, _chatComponent, _newGroup, _GroupMessage, _GroupChat,_checkFriendExist,_GroupList,_Group ,_lastchat,_LastGroupChat} from '../data/serverUrls'



//check user existence
export const userExistence = (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _checkUserExist.method,
                url: _checkUserExist.route,
                params: { userPhone }
            }
            const response = await axios(config)
            return resolve(response.data)
        }
        catch (error) {
            return reject(error.message)
        }
    })
}

//signup
export const signup = (Phone_number, Name, Profile_pic) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _signup.method,
                url: _signup.route,
                data: {
                    Phone_number,
                    Name,
                    Profile_pic
                },
                withCredentials: true,
            }
            const response = await axios(config)
            Cookies.set('userId',response.data.token)
            return resolve(response.data.data)
        }

        catch (error) {
            return reject(error.message)
        }
    })
}

//login
export const login = (Phone_number) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _login.method,
                url: _login.route,
                data: {
                    Phone_number
                },
                withCredentials: true,

            }
            const response = await axios(config)
            Cookies.set('userId',response.data.token)
            return resolve(response.data.data)
        }

        catch (error) {
            return reject(error.message)
        }
    })
}

//logout
export const logout = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _logout.method,
                url: _logout.route,
                withCredentials: 'include',
            }
            const response = await axios(config)
            Cookies.remove('userId')
            return resolve(response.data)
        }

        catch (error) {
            return reject(error.message)
        }
    })
}

// check for already loggedIn user
export const getUserSession = () => {
        try {
            const jwt= Cookies.get('userId')
            if (jwt) {
                const base64Url = jwt.split('.')[1]
                const base64 = base64Url.replace('-', '+').replace('_', '/')
                const data = JSON.parse(window.atob(base64))
                return ( { status: true, user: data.id })
            }
    
            return ({status:false})
            
        } catch (error) {
            return ({status:false})
        }
}

//user Profile
export const userProfile = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _profile.method,
                url: _profile.route,
                params: { id }
            }
            const response = await axios(config)
            return resolve(response.data[0])

        } catch (error) {
            return reject(error.message)
        }
    })

}

//update profile
export const update = (Phone_number, Name, Profile_pic) => {

    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _update.method,
                url: _update.route,
                data: {
                    Phone_number,
                    Name,
                    Profile_pic
                }
            }
            const response = await axios(config)
            return resolve(response.data[0])

        } catch (error) {
            return reject(error.message)
        }
    })

}

//add contact
export const _AddContact = (data, id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _addContact.method,
                url: _addContact.route,
                data: {
                    data,
                    id
                }
            }
            const response = await axios(config)
            return resolve(response)
        } catch (error) {
            return reject(error.message)
        }
    }
    )
}

//check friend existence
export const _friendExistence = (userPhone) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _checkFriendExist.method,
                url: _checkFriendExist.route,
                params: { userPhone }
            }
            const response = await axios(config)
            return resolve(response.data)
        }
        catch (error) {
            return reject(error.message)
        }
    })
}

//show friend request
export const Friend_Request = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _friends_request.method,
                url: _friends_request.route,
                params: { id }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }

    })
}

//friend list
export const Friend_List = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _friends.method,
                url: _friends.route,
                params: { id }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }

    })
}

//handle friend request
export const handle_request = (id, handle) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _handleRequest.method,
                url: _handleRequest.route,
                data: {
                    id,
                    handle
                }
            }
            const response = await axios(config)
            return resolve(response)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//send message
export const handle_message = (id, f_id, msg,img) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _message.method,
                url: _message.route,
                data: {
                    id,
                    f_id,
                    msg,
                    img
                }
            }
            const response = await axios(config)
            return resolve(response)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//send Group message
export const handle_GroupMessage = (id, f_id, msg,img) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _GroupMessage.method,
                url: _GroupMessage.route,
                data: {
                    id,
                    f_id,
                    msg,
                    img
                }
            }
            const response = await axios(config)
            return resolve(response)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//get messages
export const get_message = (id, f_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _chat.method,
                url: _chat.route,
                params: {
                    id,
                    f_id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}


//get last message
export const get_last_message = (id, f_id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _lastchat.method,
                url: _lastchat.route,
                params: {
                    id,
                    f_id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//get group message
export const get_GroupMessage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _GroupChat.method,
                url: _GroupChat.route,
                params: {
                    id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//get group last message
export const get_lastGroupMessage = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _LastGroupChat.method,
                url: _LastGroupChat.route,
                params: {
                    id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//get group list
export const get_GroupList = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _GroupList.method,
                url: _GroupList.route,
                params: {
                    id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//get total group
export const get_Group = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _Group.method,
                url: _Group.route,
                params: {
                    id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//get chat component
export const chat_component = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _chatComponent.method,
                url: _chatComponent.route,
                params: {
                    id
                }
            }
            const response = await axios(config)
            return resolve(response.data)

        } catch (error) {
            return reject(error.message)
        }
    })
}

// creating group
export const create_group = (list, groupname,profile_pic) => {
    return new Promise(async (resolve, reject) => {
        try {
            const config = {
                method: _newGroup.method,
                url: _newGroup.route,
                data: {
                    list,
                    groupname,
                    profile_pic
                }
            }
            await axios(config)

        } catch (error) {
            return reject(error.message)
        }
    })
}

//upload images
export const image_upload = (file) => {
    return new Promise(async (resolve, reject) => {
        try {
            const formdata=new FormData();
            formdata.append("file",file)
            const res=await axios.post('/upload',formdata,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            })
            return resolve(res.data)
        } catch (error) {
            return reject(error.message)
        }
    })
}

//set call id in cookie.
export const setCallcookie=(id)=>{
    Cookies.set('callee',id);
}

//get call id from cookie
export const getCallcookie=()=>{
    const id=Cookies.get('callee')
    return id
}

//remove call cookie
export const removeCallcookie=()=>{
    Cookies.remove('callee')
}
//set caller cookie
export const setCallercookie=(id)=>{
    Cookies.set('caller',id);
}

//get caller id from cookie
export const getCallercookie=()=>{
    const id=Cookies.get('caller')
    return id
}

//remove caller cookie
export const removeCallercookie=()=>{
    Cookies.remove('caller')
}
