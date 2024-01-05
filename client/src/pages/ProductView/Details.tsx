import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CartProduct, RootState } from "../../types";
import { Divider, Skeleton } from "antd";
import { BiCheck, BiMinus, BiPlus } from "react-icons/bi";
import { AddItem } from "../../redux/reducers/cartReducer";
import { twMerge } from "tailwind-merge";
import { useNavigate } from "react-router-dom";
import { Message } from "../../redux/reducers/appReducer";

const className = {
  containerDiv:
    "flex flex-col text-black-prm  lg:min-h-[80vh] p-4 lg:w-[48%] sm:max-lg:m-5  font-roboto  ",
  button:
    "bg-green-700 text-white py-2 px-4 lg:w-[25%] h-10 rounded-l-full rounded-r-full flex-center",
  cartStatus:
    "text-green-700 font-neon whitespace-nowrap flex flex-center w-max font-semibold text-lg animate-slidedown",
};

const PurchaseSection = ({
  quantity,
  setQuantity,
  stock,
}: {
  quantity: number;
  stock: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const { mobileView } = useSelector((state: RootState) => state.App);
  return (
    <div className="flex max-md:flex-col max-lg:justify-evenly gap-5 items-center">
      <div className="flex-center   rounded-l-full rounded-r-full w-max bg-gray-200 h-10 py-1 px-3 flex-none ">
        <button
          disabled={quantity === 1}
          onClick={() => setQuantity((prev) => prev - 1)}
          className="rounded-full flex-center "
        >
          <BiMinus size={25} color="#535353" />
        </button>
        <span className="font-neon mx-8 text-green-600 font-bold ">
          {quantity}
        </span>
        <button
          disabled={quantity === stock}
          onClick={() => setQuantity((prev) => prev + 1)}
          className="rounded-full flex-center "
        >
          <BiPlus size={25} color="#535353" />
        </button>
      </div>
      {!mobileView && (
        <div className="h-max">
          {stock < 15 ? (
            <div className="font-neon max-md:w-full text-center font-semibold text-sm md:text-lg text-gray-400">
              <span>
                Only <span className=" text-orange-400 ">{stock} items</span>{" "}
                Left!{" "}
              </span>
              <br />
              <span>Don't miss it</span>
            </div>
          ) : (
            <span className="font-neon text-green-600 text-xl font-bold ">
              InStock
            </span>
          )}
        </div>
      )}
    </div>
  );
};

const BuyButtons: React.FC<CartProduct> = (props: CartProduct) => {
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(Message({ msg: "Added To Cart", msgType: "success" }));
    dispatch(AddItem(props));
  };

  const buyNow = () => {
    dispatch(AddItem(props));
  };

  return (
    <>
      <div className="flex max-lg:items-center max-lg:flex-col gap-6 lg:w-[50%] my-6 h-max font-roboto font-bold text-xl">
        <button
          onClick={addToCart}
          className={twMerge(className.button, "lg:w-[45%] w-[80%] h-auto")}
        >
          Add To Cart
        </button>
        <button
          onClick={buyNow}
          className={twMerge(
            className.button,
            "bg-white-prm text-green-700 border-green-700 lg:w-[45%] w-[80%] h-auto border-2"
          )}
        >
          Buy Now
        </button>
      </div>
    </>
  );
};

const Details = () => {
  const navigate = useNavigate();
  const { product, loading } = useSelector((state: RootState) => state.Product);
  const [quantity, setQuantity] = useState<number>(1);
  const { cart } = useSelector((state: RootState) => state.Cart);
  const existing_item = cart.find((item) => item._id === product?._id);
  const productName: string = product?.productName as string;
  const productCategory = product?.productCategory as string;
  const productSP = product?.productSP as number;
  const productMRP = product?.productMRP as number;
  const stock = product?.stock as number;
  const slug = product?.slug as string;
  const _id = product?._id as string;

  return (
    <>
      {loading ? (
        <DetailsLoading />
      ) : (
        <div className={className.containerDiv + "animate-slideleft"}>
          <h1 className=" lg:text-2xl text-xl font-semibold ">{productName}</h1>
          <span className="text-gray-400 mt-3">{productCategory}</span>
          <Divider style={{ margin: "15px" }} />
          <span className="text-green-600 font-semibold my-2 ">
            Extra {Math.round((1 - productSP / productMRP) * 100)} % off
          </span>
          <div className="space-x-4">
            <span className="font-bold text-2xl">
              &#8377;{`${product?.productSP.toLocaleString("en-IN")}`}
            </span>
            <span className=" line-through text-gray-400 ">
              &#8377;{` ${product?.productMRP.toLocaleString("en-IN")}`}
            </span>
          </div>
          <Divider style={{ margin: "15px" }} />
          <div className="lg:h-32 max-lg:min-h-[9rem] flex flex-col justify-evenly">
            {existing_item ? (
              <>
                <span className={className.cartStatus}>
                  <BiCheck size={20} color="green" /> Added to Cart
                </span>
                <button
                  onClick={() => navigate("/cart")}
                  className={className.button + "animate-slidedown"}
                >
                  Checkout
                </button>
              </>
            ) : (
              <>
                <PurchaseSection
                  quantity={quantity}
                  setQuantity={setQuantity}
                  stock={stock}
                />
                <BuyButtons
                  _id={_id}
                  productName={productName}
                  imageSrc={product?.images[0] || ""}
                  quantity={quantity}
                  productSP={productSP}
                  slug={slug}
                  productCategory={productCategory}
                />
              </>
            )}
          </div>
          <Divider style={{ margin: "15px" }} />
          {product?.highlights && (
            <>
              <span className="font-bold text-lg text-gray-500 ">
                Highlights
              </span>
              <ul className="space-y-1  list-disc my-2">
                {product.highlights.map((h, i) => (
                  <li key={i} className=" font-neon ">
                    {h}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      )}
    </>
  );
};

const DetailsLoading = () => {
  return (
    <div className={className.containerDiv + "space-y-5"}>
      <Skeleton />
      <Skeleton />
      <div className="flex gap-x-3">
        <Skeleton.Button style={{ width: "10rem" }} />
        <Skeleton.Button style={{ width: "10rem" }} />
      </div>
      <Skeleton />
    </div>
  );
};

export default Details;
