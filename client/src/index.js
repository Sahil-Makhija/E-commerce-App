import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter , RouterProvider} from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './redux/store';

import {HomePage , ProductPage , AddNewProduct , UpdateProduct , Errorpage , SignUp , LoginForm, ProfilePage,Checkout, OrderStatus, EditProfile , ChangePassword, MyOrders, AdminDashboard, ManageOrders,ManageUsers, Admin, AdminLogin, SearchPage } from './Pages/index'
import ManageProducts from './Pages/AdminPages/ManageProducts';


const router = createBrowserRouter([
  {
    path:'/',
    element:<App/>,
    errorElement:<Errorpage msg={'page not found'} />,
    children:[
      {
        path:'/',
        element:<HomePage/>
      },
      {
        path:'/product',
        element: <ProductPage/>
      },
      {
        path:'/get/product',
        element:<SearchPage/>
      },
      {
        path:'/admin/product/new',
        element:<AddNewProduct/>
      },
      {
        path:'/product/:slug',
        element:<ProductPage/>
      },
      {
        path:'/admin/product/update/:slug',
        element:<UpdateProduct/>
      },
      {
        path:'/user/signup',
        element:<SignUp/>
      },
      {
        path:'/user/login',
        element:<LoginForm/>
      },
      {
        path:'/admin/login',
        element: <AdminLogin/>
      },
      {
        path:'/user/profile',
        element:<ProfilePage/>,
        children:[
          {
            path:'/user/profile/edit',
            element:<EditProfile/>,
          },
          {
            path:'/user/profile/edit/password',
            element:<ChangePassword/>,
          }
        ]
      },
      {
        path:'user/checkout',
        element:<Checkout/>
      },
      {
        path:'/user/order/status',
        element:<OrderStatus/>
      },
      {
        path:'/user/orders',
        element:<MyOrders/>
      },
    ]
  },
  {
    path:'/admin',
    element:<Admin/>,
    children:[
      {
        path:'/admin',
        element:<AdminDashboard/>,
      },
      {
        path : '/admin/manage/products',
        element:<ManageProducts/>
      },
      {
        path:'/admin/manage/orders',
        element:<ManageOrders/>
      },
      {
        path:'/admin/manage/Users',
        element:<ManageUsers/>
      },

    ]
  },
  
  
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);

