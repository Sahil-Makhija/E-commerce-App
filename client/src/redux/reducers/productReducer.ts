import {
  ActionCreatorWithPayload,
  Dispatch,
  PayloadAction,
  createSlice,
} from "@reduxjs/toolkit";
import { API } from "../../API/routes";
import {
  Product,
  ProductCardProps,
  ProductState,
  Response,
  productFilterProps,
} from "../../types";
import { ErrorRedirect } from "./appReducer";

type ProductActionProps = (
  dispatch: Dispatch,
  query?: productFilterProps
) => Promise<boolean>;

export const ProductAction = async (
  dispatch: Dispatch,
  fetchData: (
    params: object
  ) => Promise<Response & { products?: ProductCardProps[]; product?: Product }>,
  params: object,
  NextFunc: ActionCreatorWithPayload<ProductCardProps[]>
) => {
  try {
    dispatch(SetLoading(true));
    const data = await fetchData(params);
    if (data.status) {
      dispatch(
        NextFunc(
          (data.products as ProductCardProps[]) || (data.product as Product)
        )
      );
    } else {
      ErrorRedirect(dispatch, data.error as string);
    }
  } catch (error) {
    console.error(error);
  } finally {
    setTimeout(() => {
      dispatch(SetLoading(false));
    }, 500);
  }
};

// Actions
export const GetSingleProduct = async (
  dispatch: Dispatch,
  { slug }: { slug: string }
) => {
  dispatch(SetLoading(true));
  const data = await API.GetProductDetails({ slug });
  if (data.status) {
    dispatch(SetProduct(data.product));
  } else {
    ErrorRedirect(dispatch, data.error as string);
  }
  setTimeout(() => {
    dispatch(SetLoading(false));
  }, 500);
};

export const GetAllProducts: ProductActionProps = async (
  dispatch,
  query = {}
) => {
  try {
    dispatch(SetLoading(true));
    const data = await API.SearchProduct({ ...query });
    if (data.status) {
      dispatch(SetAllProducts(data.products));
      return true;
    } else {
      ErrorRedirect(dispatch, data.error as string);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    setTimeout(() => {
      dispatch(SetLoading(false));
    }, 500);
  }
};

export const GetFeaturedProducts: ProductActionProps = async (
  dispatch,
  query
) => {
  try {
    dispatch(SetLoading(true));
    const data = await API.GetFeaturedProducts(query);
    if (data.status) {
      dispatch(SetFeaturedProducts(data.products));
      return true;
    } else {
      ErrorRedirect(dispatch, data.error as string);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } finally {
    setTimeout(() => {
      dispatch(SetLoading(false));
    }, 500);
  }
};

export const AddAllProducts: ProductActionProps = async (
  dispatch,
  query = {}
) => {
  try {
    const data = await API.SearchProduct(query);
    if (data.status) {
      dispatch(AppendAllProducts(data.products));
      return true;
    } else {
      // ErrorRedirect(dispatch, data.error as string);
      return false;
    }
  } catch (error) {
    console.error(error);
    return false;
  } 
};

//--------------------------------------------//
const initialState: ProductState = {
  loading: false,
  product: null,
  AllProducts: [],
  featuredProducts: null,
};
const productReducer = createSlice({
  name: "Product",
  initialState,
  reducers: {
    SetLoading: (state: ProductState, action: PayloadAction<boolean>) => ({
      ...state,
      loading: action.payload,
    }),
    SetProduct: (state: ProductState, action: PayloadAction<Product>) => {
      return { ...state, product: action.payload };
    },
    SetFeaturedProducts: (
      state: ProductState,
      action: PayloadAction<ProductCardProps[]>
    ) => ({ ...state, featuredProducts: action.payload }),

    SetAllProducts: (
      state: ProductState,
      action: PayloadAction<ProductCardProps[]>
    ) => ({ ...state, AllProducts: action.payload }),
    AppendAllProducts: (
      state: ProductState,
      action: PayloadAction<ProductCardProps[]>
    ) =>(
      {...state,AllProducts:[...state.AllProducts as ProductCardProps[],...action.payload]}
    ),
  },
});

export const {
  SetProduct,
  SetFeaturedProducts,
  SetAllProducts,
  SetLoading,
  AppendAllProducts,
} = productReducer.actions;
export default productReducer.reducer;
