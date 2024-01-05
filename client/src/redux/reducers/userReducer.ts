import { Dispatch, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { LoginForm, User, UserState } from "../../types";
import { API } from "../../API/routes";
import { Message } from "./appReducer";
import Cookies from "js-cookie";

//Actions
export const LoginUser = async (dispatch: Dispatch, data: LoginForm) => {
  try {
    const response = await API.Login({ data });
    if (response.status) {
      const {name }= response.userData
      dispatch(Login(response.userData as User));
      dispatch(
        Message({
          msgType: "success",
          msg: `Welcome, ${name?.split(" ")[0] || name || "User"} `,
        })
      );
      Cookies.set("user_id", response.userData?.user_id as string, {
        path:"/",
        expires:14,
        secure:true,
        httpOnly:true
      });
    } else {
      dispatch(
        Message({ msgType: "error", msg: "Invalid Username or password!" })
      );
    }
  } catch (error) {
    console.error(error);
  }
};

const initialState: UserState = {
  isLoggedIn: false,
  userData: null,
};
const userReducer = createSlice({
  name: "User",
  initialState,
  reducers: {
    Login: (state: UserState, action: PayloadAction<User>) => {
      return { ...state, isLoggedIn: true, userData: action.payload };
    },
    Logout: (state: UserState) => {
      return { ...state, isLoggedIn: false, userData: null };
    },
  },
});

export const { Login, Logout } = userReducer.actions;
export default userReducer.reducer;
