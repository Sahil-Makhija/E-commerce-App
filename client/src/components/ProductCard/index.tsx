import { defaultImage } from "../../constants";
import { BiCart, BiCheck, BiExpand } from "react-icons/bi";
import React, { ComponentProps } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Message, OpenOverlay } from "../../redux/reducers/appReducer";
import { PRODUCT_PREVIEW } from "../../constants/overlays";
import { RootState } from "../../types";
import { Skeleton } from "antd";
import { useNavigate } from "react-router-dom";
import { shortenStr } from "../../utils/shortenStr";
import { ProductCardProps } from "../../types";
import { AddItem } from "../../redux/reducers/cartReducer";
import { twMerge } from "tailwind-merge";
import { AiOutlineHeart } from "react-icons/ai";

const className = {
  productCard:
    " rounded-lg h-auto aspect-[1/1.8] w-[9rem]  lg:w-44 p-1 lg:p-2 bg-white relative border-gray  duration-200  hover:shadow-lg font-neon shadow-sm shadow-gray-300 ",
  extendButton:
    "md:h-8 h-6 md:w-8 w-6 bg-white rounded-full flex justify-center items-center max-md:hidden border-[0.5px] ",
  outerDiv: "rounded-md  aspect-square relative w-full group bg-gray-100",
  outerDiv2: "flex flex-col py-3 px-1 ",
  insideDiv: `   z-10 rounded-md justify-evenly items-end p-3 h-full  w-full  absolute bottom-0 group-hover:flex `,
  productImage: " w-full h-full object-contain p-1",
  productName: "font-bold text-sm lg:text-lg",
  productCategory: "text-xs md:text-sm text-gray-400",
  productPrice: "absolute bottom-4 text-sm md:text-lg font-bold",
};

const ProductCard: React.FC<ProductCardProps & ComponentProps<"div">> = (
  props
) => {
  const { loading } = useSelector((state: RootState) => state.Product);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    productName,
    imageSrc,
    productCategory,
    productSP,
    slug,
    _id,
    images,
  } = props;
  const addToCart = () => {
    dispatch(AddItem({ ...props, quantity: 1 }));
    dispatch(Message({ msg: "Added To Cart", msgType: "success" }));
  };
  const addToWishlist = () => {
    return;
  };
  const { cart } = useSelector((state: RootState) => state.Cart);
  const mobileView = useSelector((state:RootState)=>state.App.mobileView)
  const ifExist = cart.find((item) => item._id === _id);
  return (
    <>
      {loading ? (
        <LoadingCard />
      ) : (
        <div
          onClick={() => navigate("/product/" + slug)}
          className={twMerge(className.productCard, props.className || "")}
        >
          <div className={className.outerDiv}>
            <img
              src={imageSrc || images?.[0] || defaultImage}
              alt="_image"
              className={className.productImage}
            />
            <div className={twMerge(className.insideDiv,`${!mobileView ?"hidden bg-[#0f0f0f44]":"flex justify-between" }`)}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(
                    OpenOverlay({
                      OverlayValue: PRODUCT_PREVIEW,
                      OverlayData: props,
                    })
                  );
                }}
                className={className.extendButton}
              >
                <BiExpand color="gray" size={ !mobileView ? 22 : 20} />
              </button>
              <button
                disabled={!!ifExist}
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart();
                }}
                className={className.extendButton}
              >
                {ifExist ? (
                  <BiCheck
                    className="animate-slidedown"
                    sixe={!mobileView ? 22 : 20}
                    color="green"
                  />
                ) : (
                  <BiCart color="gray" size={!mobileView ? 22 : 20} />
                )}
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToWishlist();
                }}
                className={twMerge(
                  className.extendButton,
                  "absolute top-2 right-2"
                )}
              >
                <AiOutlineHeart color="gray" size={25} />
              </button>
            </div>
          </div>
          <div className={className.outerDiv2}>
            <span className={className.productName}>
              {shortenStr(productName, 20) || "New Product"}
            </span>
            <span className={className.productCategory}>
              {productCategory || "category"}
            </span>
          </div>
          <span className={className.productPrice}>
            &#8377; {productSP.toLocaleString("en-IN") || " 429"}
          </span>
        </div>
      )}
    </>
  );
};

const LoadingCard: React.FC = () => {
  return (
    <div
      className={twMerge(className.productCard, "border overflow-hidden p-2")}
    >
      <div className="bg-gray-100 rounded-md w-full h-auto aspect-square" />
      <div className="my-2 ">
        <Skeleton />
      </div>
    </div>
  );
};

export default ProductCard;
