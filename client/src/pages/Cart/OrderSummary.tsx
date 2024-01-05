import { Divider } from "antd";
import React from "react";
import { CartProduct } from "../../types";
import { shortenStr } from "../../utils/shortenStr";
import { useNavigate } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { AiOutlineLoading } from "react-icons/ai";

const className = {
  container:
    "border-gray rounded-md w-full animate-slideup aspect-[2/1] p-5 flex flex-col text-black-prm h-full bg-gray-100 fixed right-4 max-h-[85%] max-w-[30%] ",
  listDiv: "flex flex-col gap-3",
  textBold: "font-bold font-roboto text-lg ",
  list: "mx-3 font-neon text-sm font-semibold space-y-3",
};

const OrderSummary: React.FC<{ cart: CartProduct[] }> = ({ cart }) => {
  const navigate = useNavigate();

  let totalAmount = 0;
  cart.map((item) => {
    totalAmount += item.productSP * item.quantity;
  });
  return (
    <div className={className.container}>
      <h1 className="text-2xl font-neon font-semibold ">Order Summary</h1>
      <Divider />
      <div className="overflow-scroll  max-h-[35%]">
        <div className="flex justify-between">
          <div className={className.listDiv}>
            <span className={className.textBold}>Items</span>
            <ul className={className.list}>
              {cart.map((item) => (
                <li key={`name-${item._id}`}>
                  {shortenStr(item.productName, 25)}
                </li>
              ))}
            </ul>
          </div>
          <div className={className.listDiv}>
            <span className="h-[1.6rem]"></span>
            <ul className={className.list}>
              {cart.map((_, index) => (
                <li key={index}>X</li>
              ))}
            </ul>
          </div>
          <div className={className.listDiv}>
            <span className={className.textBold}>Qty</span>
            <ul className={className.list}>
              {cart.map((item) => (
                <li key={`qty-${item._id}`}>{item.quantity}</li>
              ))}
            </ul>
          </div>
          <div className={className.listDiv}>
            <span className={className.textBold}>Total</span>
            <ul className={className.list}>
              {cart.map((item) => {
                return (
                  <li key={`amt-${item._id}`}>
                    &#8377;{" "}
                    {(item.quantity * item.productSP).toLocaleString("en-IN")}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
      <Divider style={{ backgroundColor: "black" }} />
      <div className="flex justify-between ">
        <span className="font-neon text-lg ">Order Total</span>
        <span className="font-roboto text-xl text-black-prm font-bold">
          &#8377; {totalAmount.toLocaleString("en-IN")}
        </span>
      </div>
      <ApplyCoupon />
      <div className="flex-center absolute bottom-3 w-full bg-inherit py-2">
        <button
          onClick={() => navigate("/order/checkout")}
          className="bg-[#343434]  text-white my-3 font-neon w-[85%] h-12 rounded-l-full rounded-r-full"
        >
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;

const ApplyCoupon: React.FC = () => {
  const [checkingCoupon, setCheckingCoupon] = React.useState<boolean>(false);

  return (
    <>
      <div className="my-5 flex flex-col gap-3 w-[60%]">
        <span className="font-neon text-sm  font-semibold text-primary">
          Have a coupon ?
        </span>
        <div className="flex">
          <input
            type="text"
            placeholder="coupon code"
            className="px-2 py-1 rounded-md border-gray rounded-r-none"
          />
          <button
            onClick={() => setCheckingCoupon(true)}
            className="h-full aspect-video rounded-md text-white bg-primary rounded-l-none flex-center"
          >
            {checkingCoupon ? (
              <AiOutlineLoading size={20} className="animate-spin" />
            ) : (
              <BiCheck size={30} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};
