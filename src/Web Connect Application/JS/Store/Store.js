import {configureStore} from '@reduxjs/toolkit'
import ChatSliceReducer from '../Features/Chat/ChatSlice.js'

export const store=configureStore({
    reducer:{
        chats:ChatSliceReducer
    },
})