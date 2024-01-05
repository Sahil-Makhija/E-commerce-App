import React from "react";
import { defaultImage } from "../../../constants";
import { CartProduct } from "../../../types";
import { shortenStr } from "../../../utils/shortenStr";
import { RemoveItem } from "../../../redux/reducers/cartReducer";
import { Dispatch } from "@reduxjs/toolkit";
import { useDispatch  } from "react-redux";
import { AiOutlineClose } from "react-icons/ai";
import { Tooltip } from "antd";
import {useNavigate} from 'react-router-dom'


const ProductCard:React.FC<CartProduct> = ({
  imageSrc,
  _id,
  productName,
  quantity,
  productSP,
  slug,
  productCategory,
  images
}) => {
  const navigate = useNavigate()
  const dispatch: Dispatch = useDispatch();
  return (
    <div onClick={()=>navigate("/product/"+slug)} className="flex justify-between animate-slideright  rounded-md duration-300 hover:cursor-pointer shadow-md shadow-gray-300 hover:shadow-xl hover:shadow-gray-500 h-44 text-black-prm relative p-2  ">
      <img
        className="aspect-square h-full object-contain p-2 rounded-md  bg-gray-100"
        src={imageSrc||images?.[0] || defaultImage}
        alt=""
      />
      <div className="flex justify-center gap-3 flex-col mx-8">
        <Tooltip title={productName}>
        <h1 className="text-2xl font-bold font-neon">
          {shortenStr(productName, 35)}
        </h1>
        </Tooltip>
        <span className="text-gray-300">{productCategory as string||"category"}</span>
      </div>
      <div className="flex justify-center gap-3 flex-col mx-8">
        <h1 className="text-2xl font-bold font-neon whitespace-nowrap ">
          &#8377; {productSP.toLocaleString("en-In")}
        </h1>
        <span className="text-sm text-gray-500">Quantity : {quantity}</span>
      </div>
      <Tooltip title="Remove from Cart">
        <button
          onClick={(e) => {
            e.stopPropagation()
            dispatch(RemoveItem(_id))}}
          className=" h-8 w-8 absolute top-2 right-2  rounded-full bg-white shadow-md shadow-black flex-center "
        >
          <AiOutlineClose size={20} />
        </button>
      </Tooltip>
    </div>
  );
};

export default ProductCard;
