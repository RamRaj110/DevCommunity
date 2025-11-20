import { createSlice } from "@reduxjs/toolkit";

const userSlice= createSlice({
    name:"user",
    initialState:{
        userInfo:null,
    },
    reducers:{
        addUserInfo:(state,action)=>{
            state.userInfo=action.payload
        },
        removeUserInfo:(state)=>{
            state.userInfo=null
        }
    }
})

export const {addUserInfo,removeUserInfo}=userSlice.actions
export default userSlice.reducer