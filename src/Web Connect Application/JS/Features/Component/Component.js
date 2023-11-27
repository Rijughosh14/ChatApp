import { createSlice} from "@reduxjs/toolkit";


const initialState={
    Component:[]
}

export const componentSlice=createSlice({
    name:'components',
    initialState,
    reducers:{
        ChatComponent:(state,action)=>{
            return {Component:action.payload.result}
        }
    }
})


export default componentSlice.reducer

export const {ChatComponent} =componentSlice.actions