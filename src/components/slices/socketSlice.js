import { createSlice } from "@reduxjs/toolkit";


const socketSlice = createSlice({
    name:"socket",
    initialState:null,
    reducers:{
        setSocket:(state,action)=>{
            return action.payload
        },
        deleteSocket:(state,action)=>{
            return null
        }
    }
})

export const { setSocket , deleteSocket } = socketSlice.actions
export default socketSlice.reducer