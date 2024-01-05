import { useEffect, useState } from "react";
import { BiCart, BiSolidCart } from "react-icons/bi";
import { useSelector } from "react-redux";
import { RootState } from "../../types";
import { useNavigate } from "react-router-dom";

const CartIcon = () => {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.Cart);
  const [cartDrawer, setCartDrawer] = useState(false);

  useEffect(() => {
    if (window.location.href.includes("/cart")) {
      setCartDrawer(true);
    } else {
      setCartDrawer(false);
    }
  }, [window.location.href]);

  return (
    <button
      onClick={() => {
        navigate("/cart");
      }}
      className=" max-lg:hidden px-2 flex justify-around items-center h-8 w-20  rounded-l-full rounded-r-full bg-[#535353] text-white"
    >
      {cartDrawer ? <BiSolidCart size={25} /> : <BiCart size={25} />}
      <span>{cart.length || 0}</span>
    </button>
  );
};

export default CartIcon;
