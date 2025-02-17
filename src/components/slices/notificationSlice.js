import { createSlice } from "@reduxjs/toolkit";

const notifySlice = createSlice({
    name:'notify',
    initialState:[],
    reducers : {
        addnotification: (state,action)=>{
            state.push(action.payload)
        }
    }
})
 
export const { addnotification } = notifySlice.actions

export default notifySlice.reducer