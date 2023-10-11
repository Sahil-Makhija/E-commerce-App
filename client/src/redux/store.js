import {configureStore} from '@reduxjs/toolkit'
import { adminReducer, cartReducer, productAPI, userReducer } from './reducers'

export const store = configureStore({
    reducer:{
        Admin:adminReducer,
        User:userReducer,
        Cart:cartReducer,
        [productAPI.reducerPath]:productAPI.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(productAPI.middleware),
})