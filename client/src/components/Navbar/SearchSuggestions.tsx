import React from "react";
import { defaultImage } from "../../constants";
import { ProductSuggestion, RootState } from "../../types";
import { shortenStr } from "../../utils/shortenStr";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";
import { Divider } from "antd";
import { useSelector } from "react-redux";
import { twMerge } from "tailwind-merge";

const SearchSuggestions: React.FC<{
  productSuggestions: ProductSuggestion[];
  showSearchSuggestions: boolean;
  setShowSearchSuggestions:React.Dispatch<React.SetStateAction<boolean>>
}> = ({ productSuggestions, showSearchSuggestions,setShowSearchSuggestions }) => {
  const searchValues: string[] =
    JSON.parse(localStorage.getItem("searchHistory") as string) || [];

  const { mobileView } = useSelector((state: RootState) => state.App);

  const removeVal = (removingVal: string) => {
    const searchHistory: string[] =
      JSON.parse(localStorage.getItem("searchHistory") as string) || [];
    localStorage.setItem(
      "searchHistory",
      JSON.stringify(searchHistory.filter((val) => val !== removingVal))
    );
  };
  return (
    <div
      onClick={(e)=>e.stopPropagation()}
      className={twMerge(
        " w-full rounded-md rounded-t-none min-h-[5rem]  max-h-[20rem]  z-50 bg-white space-y-2 p-2 border-gray top-14 my-1",
        `${showSearchSuggestions ? "block" : "hidden"}`
      )}
    >
      {searchValues &&
        searchValues.map((value, index) => (
          <div
            key={`searchVal-${index}`}
            className="w-full h-14 flex gap-4 items-center py-1 relative hover:shadow-sm shadow-gray-400 "
          >
            <span className="w-full px-5 hover:text-prm-dark">{value}</span>
            <button
              onClick={() => removeVal(value)}
              className="flex-center absolute right-2 shadow-inner shadow-gray-400 p-2 aspect-square rounded-full"
            >
              <AiOutlineClose size={10} />
            </button>
          </div>
        ))}

      <Divider className="bg-gray-200" />

      {productSuggestions.length > 0 &&
        productSuggestions.map((product, index) => (
          <div
            onClick={() => setShowSearchSuggestions(false)}
            key={`product-${index}`}
            className="w-full h-14 flex gap-4 items-center py-1 hover:shadow-sm shadow-gray-400 "
          >
            <img
              src={product.image || defaultImage}
              alt="_product"
              className=" object-contain aspect-square rounded-md h-full"
            />
            <Link
              className="font-neon hover:text-primary "
              to={"/product/" + product.slug}
            >
              {shortenStr(product.productName, mobileView ? 30 : 60)}
            </Link>
          </div>
        ))}
      {productSuggestions.length === 0 && (
        <div className="h-14 w-full flex-center font-neon font-semibold text-gray-400 ">
          No items found
        </div>
      )}
    </div>
  );
};

export default SearchSuggestions;
