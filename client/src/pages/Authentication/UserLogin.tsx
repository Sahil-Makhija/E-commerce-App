import React, { useState } from "react";
import {InputField} from "../../components";
import { Divider } from "antd";
import { useNavigate } from "react-router-dom";
import { PageBanner } from ".";
import { LoginForm } from "../../types";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../redux/reducers/userReducer";
import { Dispatch } from "@reduxjs/toolkit";

const UserLogin: React.FC = () => {
  const navigate = useNavigate()
  const dispatch:Dispatch = useDispatch()
  const [loginForm, setLoginForm] = useState<LoginForm>({
    phoneNumber: NaN,
    password: "",
  });

  return (
    <>
      <div className="w-[95%] max-w-[800px] animate-slideleft flex items-stretch min-h-[500px] max-md:mt-10 ">
        <PageBanner title="Welcome Back!" desc="Log in with your credentials." />
        <div className="lg:w-[60%] w-full border-gray p-5 flex-col gap-10 lg:h-[500px] flex-center">
          <h1 className="text-3xl font-bold font-roboto text-primary w-full">Login</h1>
          <InputField
            value={loginForm.phoneNumber}
            setValue={(val) =>
              setLoginForm((prev) => ({
                ...prev,
                phoneNumber: Number(val) || 0,
              }))
            }
            label="Phone Number"
            inputType="number"
          />
          <InputField
            value={loginForm.password}
            setValue={(val) =>
              setLoginForm((prev) => ({ ...prev, password: val }))
            }
            label="Password"
            inputType="password"
          />
          <div className="w-full flex-center flex-col  ">
            <button
              onClick={()=>LoginUser(dispatch,loginForm)}
              className=" h-12 w-52 shadow-lg shadow-primary  rounded-md bg-primary text-white font-semibold text-lg"
              type="submit"
            >
              Login
            </button>
            <Divider  />
            <div className="flex-center flex-col w-full gap-3 text-primary font-semibold">
            <span>New here? </span>
            <button onClick={()=>navigate("/user/signup")}
              className=" h-12 w-52 rounded-md text-primary bg-white border-2 border-primary font-semibold text-lg"
              type="submit"
            >
              Sign Up
            </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;
