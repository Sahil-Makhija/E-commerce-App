import { Result } from "antd";
import React, { ReactNode } from "react";
import { NextActionButton } from "../../components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CloseOverlay } from "../../redux/reducers/appReducer";
import { AiFillCheckCircle } from "react-icons/ai";

const OrderStatus: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className=" bg-gradient-to-br from-sky-400 sky to-white lg:h-[80vh] md:h-[70vh] sm:md:h-[60vh] h-[40vh] aspect-square animate-wave  rounded-2xl bg-white flex-center flex-col ">
      <Result
        className="flex-center flex-col"
        icon={success_icon}
        status={"success"}
        title="Your Order is Completed"
        extra={[
          <NextActionButton
            className=" bg-sky-500"
            buttonText="Continue Shopping"
            onClick={() => {
              dispatch(CloseOverlay());
              navigate("/");
            }}
          />,
        ]}
      />
    </div>
  );
};

const success_icon: ReactNode = (
  <>
    <div className="h-32 w-32 rounded-full bg-white text-primary flex-center animate-wave overflow-visible ">
      <AiFillCheckCircle className=" hover:-translate-y-2  duration-150 z-50" size={150} />
    </div>
  </>
);

export default OrderStatus;
