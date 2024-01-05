import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { RootState, productFilterProps } from "../../types";
import {
  AddAllProducts,
  GetAllProducts,
} from "../../redux/reducers/productReducer";
import { ProductCard, InfiniteLoading, ProductFilter } from "../../components";

const SearchPage: React.FC = () => {
  const dispatch = useDispatch();
  const { AllProducts } = useSelector((state: RootState) => state.Product);
  const { q } = useParams();
  const [page, setPage] = useState<number>(1);
  const [moreContent, setMoreContent] = useState<boolean>(true);
  const [productQuery, setProductQuery] = useState<productFilterProps>({
    limit: 6,
    page,
  });
  const [infiniteLoading, setInfiniteLoading] = useState(false);

  //fetching Products based on ProductQuery (filters , Sorting & SearchVal)
  useEffect(() => {
    setMoreContent(true);
    setPage(1);
    GetAllProducts(dispatch, { ...productQuery, search: q });
  }, [productQuery, q, dispatch]);

  //fetching Next Page Data
  useEffect(() => {
    if (page === 1) return;
    setInfiniteLoading(true);
    AddAllProducts(dispatch, { ...productQuery, page })
      .then((response) => {
        if (!response) setMoreContent(false);
        setInfiniteLoading(false);
      })
      .catch(() => setInfiniteLoading(false));
  }, [page, dispatch]);

  return (
    <div className="flex relative h-[90vh] md:px-2  items-center justify-center overflow-hidden ">
      <div className="hidden md:flex flex-col absolute left-2 w-[300px] h-[98%]">
        <ProductFilter
          filters={productQuery.filter as object}
          setProductQuery={(filters: object) =>
            setProductQuery((prev) => ({ ...prev, filter: filters }))
          }
        />
      </div>
      <InfiniteLoading
        infiniteLoading={infiniteLoading}
        moreContent={moreContent}
        loadContentFunction={() => setPage(page + 1)}
        className="grid grid-cols-2 md:grid-cols-3 gap-2 "
      >
        {AllProducts?.map((product, index) => (
          <ProductCard key={`productID-${index}`} {...product} />
        ))}
      </InfiniteLoading>
    </div>
  );
};

export default SearchPage;
