import {configureStore} from '@reduxjs/toolkit'
import ChatSliceReducer from '../Features/Chat/ChatSlice.js'
import ComponentReducer from '../Features/Component/Component.js'

export const store=configureStore({
    reducer:{
        chats:ChatSliceReducer,
        components:ComponentReducer
    },
})