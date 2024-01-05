import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

const Billboard: React.FC = () => {
  const mobileView = useSelector((state: RootState) => state.App.mobileView);
  return (
    <>
      {!mobileView && (
        <div className="w-full my-5 border rounded-md h-auto max-lg:aspect-video  lg:aspect-[3/1] flex-center text-3xl font-neon font-bold bg-gradient-to-r from-sky-400 from-50% to-sky-200 text-center flex-col">
          <span>Explore E-commerce Store</span>
        </div>
      )}
    </>
  );
};

export default Billboard;
