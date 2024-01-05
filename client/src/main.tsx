import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store/index.js";
import {ProductView,CartView, HomePage, ErrorPage, UserLogin, AuthLayout, UserSignup, OrderLayout, Checkout, SearchPage} from "./pages";
// import Test from "./pages/Test.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:"/product/search/:q",
        element:<SearchPage />
      },
      {
        path:'/product/:slug',
        element:<ProductView/>
      },
      {
        path:"/cart",
        element:<CartView/>
      },
      {
        path:'/404',
        element:<ErrorPage/>
      },
      {
        path:'/user',
        element:<AuthLayout/>,
        children:[
          {
            path:"/user/login",
            element:<UserLogin/>
          },
          {
            path:"/user/signup",
            element:<UserSignup/>
          }
        ]
      },
      {
        path:"/order",
        element:<OrderLayout/>,
        children:[
          {
            path:"/order/checkout",
            element:<Checkout/>
          }
        ]
      }
    ]
  },

]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement ).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
