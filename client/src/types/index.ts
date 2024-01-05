import { NoticeType } from "antd/es/message/interface";
import { store } from "../redux/store";

export type Admin = {
  adminName: string;
};

export type LoginForm = {
  phoneNumber: number;
  password: string | number;
};

export type User = {
  _id: string;
  name: string;
  password: string;
  phoneNumber: number;
  address: string;
  email: string;
  ordersPending: string[];
  ordersCompleted: string[];
  ordersCancelled: string[];
  wishlist: string[];
  user_id: string;
};

export type Product = {
  _id: string;
  productName: string;
  productCategory: string;
  productMRP: number;
  productSP: number;
  images: string[];
  highlights?: string[];
  stock: number;
  slug: string;
  productDescription?: string;
};

export type ProductCardProps = {
  _id: string;
  productName: string;
  imageSrc?: string;
  images?: [string];
  productCategory: string;
  productSP: number;
  slug: string;
};

export type CartProduct = ProductCardProps & { quantity: number };

export type Overlay = {
  OverlayValue: string | 0;
  OverlayData?: ProductCardProps;
};

//Redux States
export type AppState = {
  mobileView: boolean;
  Redirect: string | null;
  OverlayValue: string | number;
  OverlayData: ProductCardProps | null;
  Loading: boolean;
  Message: { msgType: NoticeType; msg: string } | null;
  Error: string | null;
};
export type AdminState = {
  isAdmin: boolean;
  adminData: Admin | null;
};
export type UserState = {
  isLoggedIn: boolean;
  userData: User | null;
};
export type CartState = {
  cart: CartProduct[];
};

export type ProductState = {
  loading: boolean;
  product: Product | null;
  AllProducts: ProductCardProps[] | null ;
  featuredProducts: ProductCardProps[] | null;
};
export interface Response {
  status: boolean;
  error?: string;
}

export type RootState = ReturnType<typeof store.getState>;

export type productFilterProps = {
  search?: string;
  filter?: object;
  limit?: number;
  page?: number;
  featured?: boolean;
};

export type ProductSuggestion = {productName:string,image:string,slug:string}
