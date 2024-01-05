import React, { useEffect } from "react";
import { ProductCard } from "../../components";
import { RootState } from "../../types";
import { useDispatch, useSelector } from "react-redux";
import { GetFeaturedProducts } from "../../redux/reducers/productReducer";
import ProductCatalog from "../../components/ProductCatalog";
import Billboard from "../../components/Billboard";

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const { featuredProducts } = useSelector((state: RootState) => state.Product);
  useEffect(() => {
    if (!featuredProducts) {
      GetFeaturedProducts(dispatch, { limit: 6, featured:false });
    }
  }, [dispatch, featuredProducts]);

  return (
    <>
    <Billboard />
    <div className="" >
      <ProductCatalog title="Explore featured products" className="lg:px-2 px-1">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2 place-items-center  lg:grid-cols-6">
          {featuredProducts &&
            featuredProducts.map((item, index) => (
              <ProductCard key={`cardID-${index}`} {...item} />
            ))}
        </div>
      </ProductCatalog>
    </div>
    </>
  );
};

export default HomePage;
