import { createSlice} from "@reduxjs/toolkit";


const initialState={
    Chat:{},
    GroupChat:{}
}


export const chatSlice=createSlice({
    name:'chats',
    initialState,
    reducers:{

        //adding a friend chats
        Chats:(state,action)=>
        {
            return {
                ...state,Chat:{
                    ...state.Chat,
                    [action.payload.id]:action.payload.result
                }
            }

        }
        ,
        
        //adding a group chats
        GroupChats:(state,action)=>
        {
            return {
                ...state,GroupChat:{
                    ...state.GroupChat,
                    [action.payload.id]:action.payload.result
                }
            }

        }
        ,

        //adding a message to the existing chat
        addChat:(state,action)=>{
            const newchat=
            {
                    chat:action.payload.msg,
                    sender_id:action.payload.id,
                    id:action.payload.n,
                    image: action.payload.response                     
            }
            return {...state,Chat:
                {
                    ...state.Chat,
                    [action.payload.c_id]:
                    [
                        ...(state.Chat[action.payload.c_id]||{}),
                        newchat
                    ]
                }}
        }
        ,

        //adding a message to a exisiting group chat
        addGroupChat:(state,action)=>{
            const newchat=
                {
                    message:action.payload.msg,
                    sender_id:action.payload.id,
                    name: action.payload.username,
                    id:action.payload.n,
                    image: action.payload.response
                }
                return {...state,GroupChat:
                    {
                        ...state.GroupChat,
                        [action.payload.RoomId]:[
                            ...(state.GroupChat[action.payload.RoomId]||{}),
                            newchat
                        ]
                    }}
        }
    }
})


export default chatSlice.reducer

export const {addChat,addGroupChat,Chats,GroupChats}=chatSlice.actions