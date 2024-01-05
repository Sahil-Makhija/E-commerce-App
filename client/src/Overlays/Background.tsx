import React, { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../types";
import { CloseOverlay } from "../redux/reducers/appReducer";
import { AiOutlineClose } from "react-icons/ai";
import { ORDER_STATUS, PRODUCT_PREVIEW } from "../constants/overlays";
import { ProductPreview } from "./components";
import OrderStatus from "./components/OrderStatus";

type BackgroundProps = {
  children: ReactNode;
};

const Background:React.FC<BackgroundProps> = ({ children }: BackgroundProps) => {
  const dispatch = useDispatch();
  const { OverlayValue } = useSelector((state: RootState) => state.App);

  const addOverlay = () => {
    switch (OverlayValue) {
      case PRODUCT_PREVIEW:
        return <ProductPreview />;
      case ORDER_STATUS:
        return <OrderStatus/>
      default:
        break;
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] flex  flex-col">
      {OverlayValue === 0 ? null : (
        <div onClick={()=>CloseOverlay()} className="fixed w-[100vw] h-[100vh] z-50 backdrop-blur-sm bg-[#00000099] flex justify-center items-center ">
          <div onClick={(e)=>e.stopPropagation()} className=" relative z-40 h-max ">
            <button
              onClick={() => dispatch(CloseOverlay())}
              className=" z-50 h-8 w-8 absolute top-2 right-2 rounded-full bg-white shadow-md shadow-black flex-center "
            >
              <AiOutlineClose size={20} />
            </button>
            {addOverlay()}
          </div>
        </div>
      )}
      {children}
    </div>
  );
};

export default Background;
