import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Admin, AdminState } from "../../types";



const initialState:AdminState = {isAdmin:false,adminData:null}

export const adminReducer = createSlice({
  name: "Admin",
  initialState,
  reducers:{
    AdminLogin:(state:AdminState,action:PayloadAction<Admin>)=>{
        state.isAdmin = true
        state.adminData = action.payload
    }
  }
});

export default adminReducer.reducer;
export const {AdminLogin} = adminReducer.actions
