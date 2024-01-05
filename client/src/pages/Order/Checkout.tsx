import React, { useState } from "react";
import { Steps, StepProps, Tooltip } from "antd";
import {
  AiFillDollarCircle,
  AiFillGift,
  AiOutlineDollarCircle,
  AiOutlineGift,
} from "react-icons/ai";
import {
  BiSolidLeftArrow,
  BiSolidRightArrow,
  BiSolidUser,
  BiUser,
} from "react-icons/bi";
import {
  NextActionButton,
  PaymentMethods,
  ProfileDetails,
} from "../../components";
import ReviewItems from "../Cart/ReviewItems";
import { useNavigate } from "react-router-dom";
import { checkout } from "../../redux/reducers/orderReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";

const Checkout: React.FC = () => {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stepItems: StepProps[] = [
    {
      title: "Confirm Your Details",
      status: stepNumber > 0 ? "finish" : "process",
      icon: stepNumber > 0 ? <BiSolidUser /> : <BiUser />,
    },
    {
      title: "Review your Items",
      status: stepNumber > 1 ? "finish" : "process",
      icon: stepNumber > 1 ? <AiFillGift /> : <AiOutlineGift />,
    },
    {
      title: "Select Payment Method",
      status: stepNumber > 2 ? "finish" : "process",
      icon: stepNumber > 2 ? <AiFillDollarCircle /> : <AiOutlineDollarCircle />,
    },
  ];

  const [paymentMethod, setPaymentMethod] = useState<string | null>(null);

  //-------------- Order Items ---------------------------
  const [orderItems,setOrderItems] = useState<{[key:string]:number}>({})
  const {cart} = useSelector((state:RootState)=>state.Cart)
  const {userData} = useSelector((state:RootState)=>state.User) 
  React.useEffect(()=>{
    cart.map((item)=>{
      setOrderItems((prev)=>({...prev,[item._id]:item.quantity}))
    })
  },[cart])
  //------------------------------------------------------

  return (
    <div className="flex items-center flex-col gap-5 relative w-[90%]  min-h-[70vh]">
      <Steps current={stepNumber} items={stepItems} />
      {stepNumber === 0 ? (
        <ProfileDetails />
      ) : stepNumber === 1 ? (
        <ReviewItems />
      ) : (
        <PaymentMethods
          setPaymentMethod={setPaymentMethod}
          paymentMethod={paymentMethod}
        />
      )}
      <div className="flex-center  fixed bottom-5 lg:bottom-24 left-6">
        {stepNumber === 0 ? (
          <NextActionButton
            onClick={() => navigate("/")}
            buttonText="Cancel Order ?"
          />
        ) : (
          <BackButton stepNumber={stepNumber} setStepNumber={setStepNumber} />
        )}
      </div>
      <div className="flex-center  fixed bottom-5 lg:bottom-24 right-6">
        {stepNumber === 2 ? (
          <NextActionButton
            onClick={() => checkout(dispatch, paymentMethod,orderItems,userData?._id as string)}
            buttonText="Proceed to payment"
          />
        ) : (
          <Nextbutton stepNumber={stepNumber} setStepNumber={setStepNumber} />
        )}
      </div>
    </div>
  );
};

export default Checkout;

type ButtonProps = {
  stepNumber: number;
  setStepNumber: React.Dispatch<React.SetStateAction<number>>;
};

const Nextbutton: React.FC<ButtonProps> = ({ stepNumber, setStepNumber }) => (
  <Tooltip title="Next">
    <button
      disabled={stepNumber === 2}
      onClick={() => setStepNumber(stepNumber + 1)}
      className={`rounded-full h-16 w-16 bg-white text-prm-dark shadow-sm shadow-gray-400 flex-center`}
    >
      <BiSolidRightArrow size={25} />
    </button>
  </Tooltip>
);

const BackButton: React.FC<ButtonProps> = ({ stepNumber, setStepNumber }) => (
  <Tooltip title="Back">
    <button
      disabled={stepNumber === 0}
      onClick={() => setStepNumber(stepNumber - 1)}
      className={`rounded-full h-16 w-16 text-prm-dark shadow-sm shadow-gray-400 flex-center `}
    >
      <BiSolidLeftArrow size={25} />
    </button>
  </Tooltip>
);
