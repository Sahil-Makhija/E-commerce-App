import React from "react";
import InputField from "../InputField";
import { useSelector } from "react-redux";
import { RootState, User } from "../../types";
import { AiOutlineMail } from "react-icons/ai";
import { BiMobile, BiSolidBuildingHouse, BiUser } from "react-icons/bi";
import { blankUserImage } from "../../constants";

const ProfileDetails: React.FC = () => {
  const {mobileView} = useSelector((state:RootState)=>state.App)
  const { userData } = useSelector((state: RootState) => state.User);
  const { name, email, phoneNumber, address } = userData as User;
  return (
    <div className="grid animate-slideleft grid-cols-1 lg:grid-cols-3 w-full md:p-4 gap-5 lg:gap-10">
      <div className=" row-span-2  grid place-items-center  " >
        <img className="w-full h-full max-w-[300px] rounded-full aspect-square  " src={blankUserImage} alt="_blankImage" />
      </div>
      <div className="flex-center hover:shadow-md shadow-gray-400 duration-150 p-2 rounded-md gap-3">
        <BiUser className="text-prm-dark" size={30} />
        <InputField
          className="border-none "
          value={name as string}
          label="Name"
        />
      </div>
      <div className="flex-center hover:shadow-md shadow-gray-400 duration-150 p-2 rounded-md gap-3">
        <AiOutlineMail className="text-prm-dark" size={30} />
        <InputField
          className="border-none"
          value={email as string}
          label="Email"
        />
      </div>
      <div className="flex-center hover:shadow-md shadow-gray-400 duration-150 p-2 rounded-md gap-3">
        <BiMobile className="text-prm-dark" size={30} />
        <InputField
          className="border-none"
          value={("+91 " + phoneNumber) as string}
          label="Contact no."
        />
      </div>
      <div className="flex-center hover:shadow-md shadow-gray-400 duration-150 p-2 rounded-md gap-3 relative">
        <BiSolidBuildingHouse className="text-prm-dark" size={30} />
        <InputField
          useTextBox
          className={`border-none ${mobileView &&'h-16'} `}
          value={address as string}
          label="Address"
        />
        <span className="text-primary text-xs font-neon font-semibold absolute top-1 right-1  " >CHANGE ADDRESS</span>
      </div>
    </div>
  );
};

export default ProfileDetails;
