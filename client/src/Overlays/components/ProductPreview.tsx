import { BiCartAlt, BiCheck, BiLinkExternal } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { ProductCardProps, RootState } from "../../types";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { AddItem } from "../../redux/reducers/cartReducer";
import { CloseOverlay, Message } from "../../redux/reducers/appReducer";

const className = {
  container:
    "flex max-lg:flex-col max-lg:mx-2 p-4 gap-x-10 gap-y-4 shadow-lg shadow-gray-500 md:w-max h-[80vh] md:h-[50vh] justify-between items-center px-4 bg-white-prm rounded-md font-neon text-black-prm   ",
  outerDiv: "rounded-md  aspect-square relative h-full  ",
  productImage:
    " lg:w-full h-full aspect-square p-2 object-contain border-gray  ",
  outerDiv2: " h-full flex flex-col justify-between w-max p-2 items-center ",
  cartStatus:
    "text-green-700  font-neon whitespace-nowrap flex flex-center w-max font-semibold text-lg animate-slidedown",
  button:
    "bg-[#353839] text-white-prm w-max rounded-l-full rounded-r-full  flex-center py-3 px-4 overflow-hidden max-md:h-20 ",
};

const ProductPreview = () => {
  const dispatch = useDispatch();
  const { OverlayData } = useSelector((state: RootState) => state.App);
  const { cart } = useSelector((state: RootState) => state.Cart);
  const {
    productName,
    productSP,
    imageSrc,
    _id,
    slug,
    productCategory,
    images,
  } = OverlayData as ProductCardProps;
  const existing_item = cart.find((item) => item._id === _id);

  const addToCart = () => {
    dispatch(Message({ msg: "Added To Cart", msgType: "success" }));
    dispatch(
      AddItem({
        _id,
        productName,
        productSP,
        slug,
        quantity: 1,
        imageSrc,
        productCategory,
        images,
      })
    );
  };
  return (
    <div className="animate-slideup">
    <div className={className.container}>
      <div className={className.outerDiv}>
        <img
          className={className.productImage}
          src={imageSrc || images?.[0]}
          alt="_productImage"
        />
      </div>
      <div className={className.outerDiv2}>
        <div className="flex flex-col h-full gap-y-6 max-md:max-w-[60%] ">
          <Tooltip  title={productName}>
            <span className="font-bold text-lg md:text-2xl text-ellipsis max-w-sm whitespace-nowrap ">
              {productName}
            </span>
          </Tooltip>
          <span className="text-2xl mt-2 ">
            &#8377; {OverlayData?.productSP.toLocaleString("en-IN")}
          </span>
        </div>
        <div className="flex max-md:flex-col gap-4 w-full flex-center md:h-16">
          {existing_item ? (
            <span className={className.cartStatus}>
              <BiCheck size={20} color="green" /> Added to Cart
            </span>
          ) : (
            <button onClick={() => addToCart()} className={className.button}>
              Add To Cart <BiCartAlt className="mx-2" />
            </button>
          )}
          <Link
            to={("/product/" + OverlayData?.slug) as string}
            className={className.button}
            onClick={() => dispatch(CloseOverlay())}
          >
            View Details <BiLinkExternal className="mx-2" />{" "}
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProductPreview;
