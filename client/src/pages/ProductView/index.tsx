import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GetSingleProduct } from "../../redux/reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../types";
import Gallery from "./Gallery";
import Details from "./Details";

const className = {
  containerDiv:
    "w-full  min-h-[80vh] flex justify-evenly gap-x-18 bg-white lg:rounded-lg py-5 flex-col lg:flex-row sm:max-lg:p-3   ",
};

const ProductView: React.FC = () => {
  const dispatch = useDispatch();
  const { slug } = useParams();
  const { product, loading }= useSelector((state: RootState) => state.Product);
  
  useEffect(() => {
    if(slug!==product?.slug)
    GetSingleProduct(dispatch, { slug: slug as string });
  }, [slug,dispatch,product?.slug]);

  const [mainImage, setMainImage] = useState<string>(product?.images[0] as string);
  useEffect(() => {
    setMainImage(product?.images[0] as string);
  }, [product]);
  return (
    <section className={className.containerDiv}>
      <>
        <Gallery
          loading={loading}
          images={product?.images || []}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
        <Details />
      </>
    </section>
  );
};

export default ProductView;
