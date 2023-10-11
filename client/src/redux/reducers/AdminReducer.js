import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isAdmin:false
}

const adminReducer = createSlice({
    name:'Admin',
    initialState,
    reducers:{
        Admin_Login:(state,action)=>{
            return {...state,isAdmin:true}
        }
    }
})

export const {Admin_Login} = adminReducer.actions
export default adminReducer.reducer