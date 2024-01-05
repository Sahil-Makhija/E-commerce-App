import React from "react";
import ReviewItems from "./ReviewItems";
import OrderSummary from "./OrderSummary";
import { useSelector } from "react-redux";
import { ProductCardProps, RootState } from "../../types";
import { NextActionButton, ProductCard } from "../../components";
import { useNavigate } from "react-router-dom";
import { BiCart } from "react-icons/bi";
import CartImage from "../../assets/images/empty.png";
const CartView: React.FC = () => {
  const { mobileView } = useSelector((state: RootState) => state.App);
  const { cart } = useSelector((state: RootState) => state.Cart);

  if (cart.length === 0) {
    return <div className="w-full h-full overflow-hidden flex flex-center ">
      <EmptyCart/>
    </div>
  }
  if (mobileView) {
    return <CartViewMobile cart={cart} />;
  }
  return (
    <div className="my-6 flex justify-between min-h-[70vh]">
      <ReviewItems />
      <div className="w-[30%] max-h-[600px] relative">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

const CartViewMobile: React.FC<{ cart: ProductCardProps[] }> = ({ cart }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full grid grid-cols-2 gap-2 p-1  relative">
      {cart.map((product, index) => (
        <>
          <ProductCard key={`cart-product-mobile-${index}`} {...product} />
        </>
      ))}
      <button
        onClick={() => navigate("/order/checkout")}
        className="bg-[#343434] fixed bottom-3 right-3  text-white my-3 font-neon w-max px-4 h-10 rounded-l-full rounded-r-full"
      >
        CHECKOUT
      </button>
    </div>
  );
};

export default CartView;

const EmptyCart: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="w-[45vmax] h-fit  flex-center flex-col gap-5 font-neon lg:text-3xl text-xl ">
      <img src={CartImage} alt="_empty_cart" />
      <div className="flex-center gap-10 flex-col">
        <span>No items in your cart</span>
        <NextActionButton
          className=" h-12 text-sm lg:text-lg flex-center overflow-hidden"
          buttonText={
            <>
              View Products <BiCart className="px-1" size={35} />
            </>
          }
          onClick={() => navigate("/")}
        />
      </div>
    </div>
  );
};
