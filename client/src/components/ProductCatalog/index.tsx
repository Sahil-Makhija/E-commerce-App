import React, { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";
type ProductCatalogProps = { title: string } & ComponentProps<"div">;

const ProductCatalog: React.FC<ProductCatalogProps> = ({
  title,
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={twMerge(
        "w-full h-max rounded-md border py-2 gap-4 flex flex-col my-3 text-black-prm ",
        className
      )}
    >
      <span className="w-full font-neon text-lg lg:text-xl font-semibold   ">
        {title}
      </span>
      {children}
    </div>
  );
};

export default ProductCatalog;
