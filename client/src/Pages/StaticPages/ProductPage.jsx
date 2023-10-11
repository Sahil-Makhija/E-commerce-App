import React from 'react'
import { Image, Rate, message } from 'antd'
import { useGetProductDataQuery } from '../../redux/reducers/productAPI'
import { useNavigate, useParams } from 'react-router-dom'
import Errorpage from './Errorpage'
import ProductCatalog from './../components/ProductCatalog'
import { useDispatch, useSelector } from 'react-redux'
import loginWithCookie from '../../utils/loginWithCookie'
import Loading from '../components/Loading'
import shortenString from '../../utils/shortenStr'

const ProductPage = () => {
    window.scrollTo(0, 0)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { isLoggedIn } = useSelector(state => state.User)
    loginWithCookie(isLoggedIn, dispatch)
    const { slug } = useParams()
    const { data, error, isLoading } = useGetProductDataQuery({ slug })
    if (data?.error) {
        return (<Errorpage msg={data.error} />)
    }
    const productData = data?.productData
    const addToCart = () => {
        messageApi.success({ content: 'Added to cart!' })
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                productID: productData._id,
                productName: productData?.productName,
                image: productData.images[0],
                qty: 1,
                slug: productData.slug,
                price: productData.productSP
            }
        })
    }

    const buyNow = () => {
        messageApi.info({ content: 'Proceeding to checkout!' })
        dispatch({ type: 'EMPTY_CART' })
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                productID: productData._id,
                productName: productData?.productName,
                image: productData.images[0],
                qty: 1,
                slug: productData.slug,
                price: productData.productSP
            }
        })
        navigate('/user/checkout')

    }

    if (isLoading) { return (<Loading />) }
    else if (error) { return <Errorpage msg={error} /> }
    else {
        document.title = shortenString(productData?.productName)
        return (
            <section className='flex-col flex items-center'>
                {contextHolder}
                <section className=' lg:flex-row flex-col flex space-x-2 lg:space-x-8 space-y-5 lg:space-y-0 lg:justify-evenly lg:items-stretch items-center min-h-[80vh]  w-full my-5 p-2'>



                    <section className='md:w-[40%] w-[95%] card-bg rounded-xl flex flex-col items-center justify-evenly space-y-3 py-3' >
                        <div>
                            <Image className='rounded-md  max-h-[30vmax] max-w-[30vmax]' src={productData?.images[0]} />
                        </div>
                        <div className='flex space-x-2 items-stretch pr-1 border-r-[1.5px]  ' >
                            {productData?.images.map((image, index) => {
                                if (index === 0) { return null }
                                else return (
                                    <Image className='rounded-sm' width={'6vmax'} height={'6vmax'} src={image} />
                                )
                            })}
                        </div>
                        <div className=' flex space-x-3  justify-center w-full'>
                            <button style={{ fontFamily: 'Lexend, sans-serif' }} onClick={() => {isLoggedIn ? buyNow() : messageApi.error({content:'Please Login to proceed!'}) }} className='bg-green-500 font-bold w-[40%] text-white rounded-md py-1 px-2 md:h-[6vmin] text-[4vmin] flex items-center justify-center hover:shadow-md hover:shadow-gray-500 '>Buy Now</button>
                            <button style={{ fontFamily: 'Lexend, sans-serif' }} onClick={() => {addToCart()}} className='text-green-500 border-[1.5px]   w-[40%] bg-white rounded-md text-[4vmin] flex items-center justify-center md:h-[6vmin] py-1 px-2 hover:shadow-md hover:shadow-gray-500 '>Add To Cart</button>
                        </div>

                    </section>

                    <div className='card-bg text-[#3f3f3f]  rounded-lg justify-center flex flex-col w-[95%] lg:w-[60%]  text-[3.5vmin] md:text-[2.5vmin]  p-5 '>
                        <h1 className='text-[30px] font-bold text-gradient' style={{ fontFamily: 'Lexend, sans-serif' }}  >{productData?.productName}</h1>
                        <Rate allowHalf value={5} disabled />
                        <p className=' text-[2.5vmin] text-green-300'>Extra &#8377; {(productData?.productMRP - productData?.productSP).toLocaleString('en-IN')} off</p>
                        <div className='px-3 rounded-lg' >
                            <span className='font-bold text-[4vmin] text-gradient '>&#8377; {(productData?.productSP).toLocaleString('en-IN')} </span><span className=' line-through'>&#8377; {productData?.productMRP.toLocaleString('en-IN')}</span>
                        </div>
                        <br />
                        {productData?.highlights && (
                            <div className='flex justify-between md:justify-start space-x-6'>
                                <h3 className='font-bold'>Highlights</h3>
                                <ul className='list-disc space-y-2  mx-4' >
                                    {productData?.highlights.map((point) => {
                                        return (<li>{point}</li>)
                                    })}
                                </ul>
                            </div>)}<br />
                        {productData?.productDescription && (
                            <div className='flex space-x-3'>
                                <h3 className='font-bold'>Description</h3>
                                <p className=''>
                                    {productData?.productDescription}
                                </p>
                            </div>

                        )}

                    </div>
                </section>
                <hr className='my-5 text-black' />
                <div className='flex  border-t-2 py-5 flex-col overflow-x-scroll  bg-gray-100 rounded-xl  space-y-3 w-[80%] '>
                    <h2 style={{ fontFamily: 'Lexend, sans-serif' }} className='w-full mx-2 text-[4vmin] font-bold text-green-500'>Browse other products similar to this</h2>
                    <ProductCatalog except={productData.productName} data={{ category: productData?.productCategory }} />
                </div>
            </section>



        )
    }
}

export default ProductPage
