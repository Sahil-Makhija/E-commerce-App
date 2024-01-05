import {
  LoginForm,
  Product,
  User,
  Response,
  ProductCardProps,
  productFilterProps,
} from "../types";
import request from "./_axiosInterface";

const POST = "POST";
const GET = "GET";
const DELETE = "DELETE";

class ServerService {
  //Admin Routes
  async CreateProduct({ data }: { data: object }) {
    return await request({ url: "/admin/product/new", method: POST, data });
  }
  async GetAllProducts(): Promise<{
    status: boolean;
    products?: Product[];
    error?: string;
  }> {
    return await request({ url: "/admin/products/all", method: POST });
  }
  async UpdateProduct({ data }: { data: object }) {
    return await request({ url: "/admin/product/update", method: POST, data });
  }
  async DeleteProduct() {
    return await request({ url: "/admin/product/delete", method: DELETE });
  }

  async GetAllUsers() {
    return await request({ url: "/admin/users/all", method: GET });
  }
  async DeleteUser({ id }: { id: string }) {
    return await request({ url: `/admin/user/delete/${id}`, method: DELETE });
  }

  async GetAllOrders() {
    return await request({ url: "/admin/orders/all", method: GET });
  }
  async RejectOrder({ data }: { data: object }) {
    return await request({ url: "/admin/order/cancel", method: POST, data });
  }
  async UpdateOrder({ data }: { data: object }) {
    return await request({ url: "/admin/order/update", method: POST, data });
  }

  async CreateNewAdmin({ data }: { data: object }) {
    return await request({ url: "/admin/create", method: POST, data });
  }
  async GetAdminData({ data }: { data: object }) {
    return await request({ url: "/admin/retrieve", method: POST, data });
  }
  async GetAuthQues({ data }: { data: object }) {
    return await request({ url: "/admin/auth-ques", method: POST, data });
  }

  //User Routes

  async Checkout({
    data,
  }: {
    data: { user_id: string; orderItems: { [key: string]: number } };
  }) {
    return await request({
      url: "/order/payment/checkout",
      method: POST,
      data,
    });
  }

  async PlaceOrder({
    data,
  }: {
    data: {
      user_id: string;
      orderItems: { [key: string]: number };
      modeOfPayment: string;
    };
  }) {
    return await request({
      url: "/user/order/new",
      method: POST,
      data,
      withCredentials: true,
    });
  }
  async CancelOrder({ data }: { data: object }) {
    return await request({ url: "/user/order/cancel", method: POST, data });
  }

  async GetProductById({
    id,
  }: {
    id: string;
  }): Promise<Response & { product: Product }> {
    return await request({ url: `/product/id/${id}`, method: GET });
  }
  async GetProductDetails({
    slug,
  }: {
    slug: string;
  }): Promise<Response & { product: Product }> {
    return await request({ url: `/product/${slug}`, method: GET });
  }

  async GetFeaturedProducts(
    params?: productFilterProps
  ): Promise<Response & { products: ProductCardProps[] }> {
    return await request({
      url: "/get/product",
      method: POST,
      data: { featured:true , ...params},
    });
  }
  //TODO : In Development
  async SearchProduct(query: productFilterProps): Promise<Response & { products: ProductCardProps[] }> {
    return await request({
      url: "/get/product",
      method: POST,
      data: { ...query},
    });
  }
  async SignUp({ data }: { data: object }) {
    return await request({ url: "/user/signup", method: POST, data });
  }
  async Login({
    data,
  }: {
    data: LoginForm;
  }): Promise<Response & { userData: User }> {
    return await request({
      url: "/user/login",
      method: POST,
      data,
      withCredentials: true,
    });
  }
  async RemoveME({ id }: { id: string }) {
    return await request({ url: `/user/delete/${id}`, method: DELETE });
  }
  async UpdateUser({ data }: { data: object }) {
    return await request({ url: "/user/update", method: POST, data });
  }
  async ChangePassword({ data }: { data: object }) {
    return await request({ url: "/user/update/password", method: POST, data });
  }
}

export const API = new ServerService();
