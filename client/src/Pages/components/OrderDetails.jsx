import React from 'react'
import { Link } from 'react-router-dom'
import shortenString from '../../utils/shortenStr'
import { Button } from 'antd'

const OrderDetails = ({ orderData, status }) => {
    const { orderDate, image, productName, price, slug } = orderData
    return (
        <section className='bg-white  flex flex-col rounded-lg p-2 space-y-5 '>
            <h1 className='font-bold font-mono text-green-400 text-[3vmin]'>{status + ' ' + orderDate}</h1>
            <div className='flex space-x-6 space-y-2'>
                <div className='w-[12vmax] h-[12vmax]  flex items-center justify-center '>
                    <img className='max-h-[20vmin]' src={image} alt="product_image" />
                </div>
                <div>
                    <Link to={'/product/'+slug} ><h2 className='text-[2.5vmin]'>{shortenString(productName)}</h2><br /></Link>
                    <h2 className='font-bold text-[3vmin] text-green-300'>&#8377;{price}</h2>
                <Button className='my-3 rounded-sm' type='primary' danger>Cancel</Button>
                </div>

            </div>
        </section>
    )
}

export default OrderDetails
