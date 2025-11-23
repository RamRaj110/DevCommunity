import { createSlice } from "@reduxjs/toolkit";

// Load user from localStorage on app start
const storedUser = typeof window !== 'undefined' && localStorage.getItem('userInfo') 
  ? JSON.parse(localStorage.getItem('userInfo')) 
  : null;

const userSlice= createSlice({
    name:"user",
    initialState:{
        userInfo: storedUser,
    },
    reducers:{
        addUserInfo:(state,action)=>{
            state.userInfo=action.payload
            // Save to localStorage
            if(typeof window !== 'undefined') {
                localStorage.setItem('userInfo', JSON.stringify(action.payload))
            }
        },
        removeUserInfo:(state)=>{
            state.userInfo=null
            // Clear from localStorage
            if(typeof window !== 'undefined') {
                localStorage.removeItem('userInfo')
            }
        }
    }
})

export const {addUserInfo,removeUserInfo}=userSlice.actions
export default userSlice.reducer