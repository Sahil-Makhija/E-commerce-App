import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { Navigate, Outlet } from "react-router-dom";

const AuthLayout: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.User);
  return (
    <>
      {isLoggedIn ? (
        <Navigate to="/" />
      ) : (
        <section className="flex-center flex-1  flex-col py-10">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default AuthLayout;

export const PageBanner: React.FC<{ title: string; desc: string }> = ({
  title,
  desc,
}) => {
  return (
    <div className="w-[40%] text-white h-[500px] p-5 max-md:hidden bg-primary flex py-10 gap-10 flex-col ">
      <h2 className="text-2xl font-bold font-neon ">{title}</h2>
      <span className="text-lg text-gray-100">{desc}</span>
    </div>
  );
};
