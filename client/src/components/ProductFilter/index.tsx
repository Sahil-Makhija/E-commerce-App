import React from "react";
import { productCategories } from "../../constants";

const ProductFilter: React.FC<{ setProductQuery: (query: object) => void , filters:{productCategory?:string} }> = ({
  setProductQuery,filters
}) => {
  return (
    <div className="rounded-lg shadow-inner shadow-gray-500 w-full h-full flex p-5 flex-col">
      <div className="flex flex-col gap-4 font-neon text-black-prm">
        <span className="font-semibold text-lg">Categories</span>
        <ul className="mx-3 gap-2 flex flex-col ">
          {productCategories.map((category) => (
            <li
              onClick={() =>
                setProductQuery({ productCategory: category.value })
              }
              key={category.value}
              className={`${ filters?.productCategory === category.value ?"font-semibold" : "hover:font-semibold"} cursor-pointer transition-all hover:-translate-y-1 duration-150 delay-75`}
            >
              {category.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProductFilter;
