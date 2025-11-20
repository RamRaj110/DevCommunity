import { createSlice } from "@reduxjs/toolkit";


const connectionSlice = createSlice({
    name:'connection',
    initialState:[],
    reducers:{
        addConnection:(state,action)=> action.payload,
        // eslint-disable-next-line no-unused-vars
        removeConnection:()=> null
    }
})


export const {addConnection,removeConnection} =connectionSlice.actions  

export default connectionSlice.reducer
