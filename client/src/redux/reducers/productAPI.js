//TODO : Add headers for security,

import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'
import { BACKEND_URI } from '../../config'

const productAPI = createApi({
    reducerPath:'productAPI',
    baseQuery:fetchBaseQuery({
        baseUrl:BACKEND_URI,
    }),
    endpoints:(builder)=>(
        {
            getProductData:builder.query({
                query:({slug})=> `/product/${slug}`
            }),
            getProductStatus:builder.query({
                query:({slug})=>`/admin/product/update/${slug}`
            }),
            getProductByQuery:builder.query({
                query:({search,category})=>`/get/product?search=${search}&category=${category}`
            })
            // getProductDataByID:builder.query({
            //     query:({_id})=>`/productbyId/${_id}`
            // })
        }
    )
})

export {productAPI}
export const {useGetProductDataQuery , useGetProductStatusQuery , useGetProductByQueryQuery} = productAPI