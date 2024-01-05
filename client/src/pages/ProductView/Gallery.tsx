import React, { Dispatch } from "react";
import { Skeleton } from "antd";

type Gallery = {
  loading: boolean;
  images: string[];
  mainImage: string;
  setMainImage: Dispatch<React.SetStateAction<string>>;
};

const Gallery = ({ loading, images, mainImage, setMainImage }: Gallery) => {
  return (
    <div className="flex-center  flex-col gap-y-6 m-5 lg:w-[30%] lg:h-[85vh]  ">
      {/* for main image */}
      <div className="w-full max-w-[400px] aspect-square rounded-lg flex-center border-gray animate-slideup ">
        {loading ? (
          <Skeleton.Image
            style={{ width: "60vmin", height: "60vmin" }}
            active={loading}
          />
        ) : (
          <img
            src={mainImage}
            alt="_coverImage"
            className="w-full h-full object-contain p-2  "
          />
        )}
      </div>
      {/* for other images */}
      <div className="flex w-full overflow-x-scroll gap-x-4 ">
        {loading
          ? [1, 2, 3,4].map((e) => <Skeleton.Image style={{width:"100px"}} className="flex-none" key={e} active={loading} />)
          : images
              ?.filter((src) => src !== mainImage)
              ?.map((src, index) => {
                return (
                  <img
                    key={index}
                    onClick={() => setMainImage(src)}
                    className={`w-full max-w-[150px] hover:cursor-pointer aspect-square rounded-md p-2 border-[0.5px] hover:border-2 hover:border-black-prm object-contain animate-slideright`}
                    src={src}
                    alt=""
                  />
                );
              })}
      </div>
    </div>
  );
};

export default Gallery;
