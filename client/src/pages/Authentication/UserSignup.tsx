import React, { useState } from "react";
import {InputField} from "../../components";
import { Divider } from "antd";
import { PageBanner } from ".";

type SignUpForm = {
  name: string;
  password: string | number;
  email: string;
  phoneNumber: number;
};

const UserSignup: React.FC = () => {
  const [signUpForm, setSignUpForm] = useState<SignUpForm>({
    name: "",
    password: "",
    email: "",
    phoneNumber: NaN,
  });
  return (
    <>
      <div className="w-[95%] max-w-[800px] flex items-stretch min-h-[500px] max-md:mt-10 ">
        <PageBanner
          title="Looks like you're new here!"
          desc="Sign up with your phone number"
        />
        <div className="lg:w-[60%] w-full border-gray p-5 flex-col gap-10 lg:h-[500px] flex-center">
          <InputField
            value={signUpForm.phoneNumber}
            setValue={(val) =>
              setSignUpForm((prev) => ({
                ...prev,
                phoneNumber: Number(val) || 0,
              }))
            }
            label="Phone Number"
            inputType="number"
          />
          <InputField
            value={signUpForm.password}
            setValue={(val) =>
              setSignUpForm((prev) => ({ ...prev, password: val }))
            }
            label="Password"
            inputType="password"
          />
          <div className="w-full flex-center flex-col  ">
            <button
              className=" h-12 w-52 shadow-lg shadow-primary  rounded-md bg-primary text-white font-semibold text-lg"
              type="submit"
            >
              Login
            </button>
            <Divider />
            <button
              className=" h-12 w-52 rounded-md text-primary bg-white border-2 border-primary font-semibold text-lg"
              type="submit"
            >
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSignup;
