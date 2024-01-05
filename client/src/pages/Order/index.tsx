import React ,{useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";
import { Navigate, Outlet } from "react-router-dom";
import { Message } from "../../redux/reducers/appReducer";

const OrderLayout: React.FC = () => {
  const { isLoggedIn } = useSelector((state: RootState) => state.User);
  const {cart} = useSelector((state:RootState)=>state.Cart)
  const dispatch = useDispatch();
  useEffect(()=>{
    if (!isLoggedIn){
        dispatch(Message({msg:"Login to place your order",msgType:"info"}))
    }
  },[isLoggedIn,dispatch])  
  return (
    <>
      {(cart.length === 0 || !isLoggedIn)? (
        <Navigate to="/user/login" />
      ) : (
        <section className="flex-center flex-col py-10">
          <Outlet />
        </section>
      )}
    </>
  );
};

export default OrderLayout;
