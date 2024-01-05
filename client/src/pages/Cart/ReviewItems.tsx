import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { Divider } from "antd";
import ProductCard from "../../components/ProductCard/Cart";

const ReviewItems: React.FC = () => {
  const { cart } = useSelector((state: RootState) => state.Cart);  
  return (
    <div className="border-gray rounded-md h-max w-[65%] py-5 px-6 grid gap-4  ">
      <h1 className="text-2xl font-semibold font-roboto text-black-prm w-full flex justify-between ">
        <span>Items in your Cart</span>
        {cart.length > 0 && (
          <span className="text-lg">{cart.length} item(s)</span>
        )}
      </h1>
      <Divider />
      {cart.length === 0 ? (
        <div className="w-full h-full flex-center min-h-[11rem]  ">
          {/* <img src={} className='object-contain h-96 aspect-square' alt="" /> */}
          <h1 className="text-gray-300 text-2xl font-neon font-bold ">
            No items in Cart
          </h1>
        </div>
      ) : (
        <>
          {cart.map((item, index) => (
            <ProductCard key={index} {...item}  />
          ))}
        </>
      )}
    </div>
  );
};

export default ReviewItems;
