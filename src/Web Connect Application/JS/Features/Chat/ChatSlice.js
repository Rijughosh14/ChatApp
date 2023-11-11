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
                    [action.payload.id]:[action.payload.result]
                }
            }

        }
        ,
        
        //adding a group chats
        GroupChats:(state,action)=>
        {
            return {
                ...state,Chat:{
                    ...state.Chat,
                    [action.payload.id]:[action.payload.result]
                }
            }

        }
        ,

        //adding a message to the existing chat
        addChat:(state,action)=>{
            const newchat=
            {
                    chat: '',
                    sender_id: '',
                    id: '',
                    image: ''                     
            }
            return {...state,Chat:
                {
                    ...state.Chat,
                    [action.payload.id]:[
                        ...(state.Chat[action.payload.id]||[]),
                        newchat
                    ]
                }}
        }
        ,

        //adding a message to a exisiting group chat
        addGroupChat:(state,action)=>{
            const newchat=
                {
                    message:'',
                    sender_id: '',
                    name: '',
                    id: '',
                    image: ''
                }
                return {...state,GroupChat:
                    {
                        ...state.GroupChat,
                        [action.payload.id]:[
                            ...(state.GroupChat[action.payload.id]||[]),
                            newchat
                        ]
                    }}
        }
    }
})


export default chatSlice.reducer

export const {addChat,addGroupChat,Chats,GroupChats}=chatSlice.actions