import React  from "react";
import { AiFillHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Navbar } from "../../components";
import { useSelector } from "react-redux";
import { RootState } from "../../types";

const ErrorPage: React.FC = () => {
  const {Error} = useSelector((state:RootState)=>state.App)
  const pageNotFound = !window.location.href.includes("/404")
  return (
    <div className="w-full h-[80vh] flex justify-center items-center gap-5 flex-col ">
      <Navbar/>
      <span className="text-sm text-gray-600 font-neon font-bold">
        uh..oh..
      </span>
      <span className="text-3xl text-gray-600 font-roboto font-bold">
        { pageNotFound ? "Page not found!":Error}
      </span>
      <Link
        to="/"
        className="rounded-md h-9 w-max px-3 py-2 flex-center gap-3 bg-sky-600 text-white"
      >
        <AiFillHome />
        <span className="text-lg ">Go Home</span>
      </Link>
    </div>
  );
};

export default ErrorPage;
