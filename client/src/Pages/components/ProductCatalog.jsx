//TODO : Retrieve all in a single request

import React, { useEffect, useState } from 'react'
import ImageCard from './ImageCard'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import { useGetProductByQueryQuery } from '../../redux/reducers/productAPI'
import Loading from './Loading'
import Errorpage from '../StaticPages/Errorpage'

const ProductCatalog = ({ data , except }) => {
    
    const { title, category  } = data
    const [product, setProduct] = useState([])
    const {data:productData , error , isLoading} = useGetProductByQueryQuery({search:null,category})

    useEffect(()=>{
        setProduct(productData?.allProductData)
    },[productData])

    if (isLoading){return <Loading/>}
    else if (error){return <Errorpage msg={error.message} />}
    return (
        <div className='flex w-[100vw]  overflow-x-scroll items-center overflow-y-hidden h-[23vmax]  p-2'>

            {!except && (<div className=' max-w-[21vmax] min-w-[21vmax] h-[21vmax] lg:min-w-[17vmax] lg:max-w-[17vmax]  lg:h-[17vmax] flex flex-col space-y-5 border-2 border-gray-400 justify-center items-center px-2'>
                <h2 className='font-bold text-[3vmin] text-center'>Explore {title}</h2>
                <Link to={`/get/product?category=${category}`}><Button className='bg-blue-500  ' type='primary'>view all</Button></Link>
            </div>)}
            {product?.length > 0 && product?.map((item , index) => {
                if (item.productName === except){return null}
                return (
                   index<5 &&<div className='max-w-[21vmax] min-w-[21vmax] h-[21vmax] lg:min-w-[17vmax] lg:max-w-[17vmax]  lg:h-[17vmax] relative mx-2' ><ImageCard item={item} /></div>
                )
            })
            }



        </div>
    )
}

export default ProductCatalog

