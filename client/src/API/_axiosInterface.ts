import axios, { AxiosInstance } from "axios";

const TESTING = false;
const SERVER_URL = "http://127.0.0.1:4000";
// "https://server-e-commerce-app.vercel.app"
//  "http://127.0.0.1:4000"

//axios instance
const _axios: AxiosInstance = axios.create({
  baseURL: SERVER_URL,
});

type fetchOptions = {
  url: string;
  method: string;
  data?: object;
  withCredentials?: boolean;
};

const request = async ({
  url = "/",
  method = "GET",
  data = {},
  withCredentials = false,
}: fetchOptions) => {
  TESTING && console.log("Request" , data);
  return await _axios({ url, method, data, withCredentials })
    .then((response) => {
      TESTING && console.log("Response", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error(error?.message);
      return {
        status: false,
        error: error?.message || "Couldn't fetch data at this moment! ",
      };
    });
};

export default request;
