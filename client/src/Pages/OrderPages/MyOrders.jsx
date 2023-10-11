import { Segmented } from 'antd'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginWithCookie from '../../utils/loginWithCookie'
import OrderDetails from '../components/OrderDetails'
// import image from '../../images(test)/empty-cart.png'

const MyOrders = () => {
    const dispatch = useDispatch()
    loginWithCookie(false, dispatch)


    const { ordersPending, ordersCompleted, ordersCanceled, wishlist } = useSelector(state => state.User)
    const [itemList, setItemList] = useState(ordersCompleted)
    const [comm, setComm] = useState('')
    const handleChange = (listName) => {
        switch (listName) {
            case 'Orders Delivered':
                setItemList(ordersCompleted)
                setComm('Delivered by ')
                break;
            case 'Orders Pending':
                setItemList(ordersPending)
                setComm('Order placed on ')
                break;
            case 'Orders Cancelled':
                setItemList(ordersCanceled)
                setComm('Order placed on ')
                break;
            case 'Wishlist':
                setItemList(wishlist)
                break;
            default:
                break;
        }
    }
    return (
        <section className='flex flex-col justify-center items-center'>
            <div className='flex bg-[#f0f0f0] rounded-xl flex-col w-[98%] lg:w-[60%] justify-center p-5 space-y-5 '>
                <h1 className='text-green-500 font-bold text-[5vmin]'>Your Orders</h1>
                <Segmented
                    id='orderStatus'
                    defaultValue={'Orders Delivered'}
                    onChange={(value) => { handleChange(value) }}
                    className='shadow-md text-[2.5vmin] lg:overflow-hidden bg-[#f0f0f0] overflow-x-scroll shadow-gray-600 py-1'
                    options={['Orders Delivered', 'Orders Pending', 'Orders Cancelled', 'Wishlist']}
                     />
                <div className='w-full flex flex-col space-y-2'>
                    {itemList?.map((item) => {
                        return <OrderDetails status={comm} orderData={item} />
                    })}
                </div>
                {itemList?.length === 0 && (
                    <div className='w-full h-full flex flex-col justify-center items-center'>
                        {/* <img className='w-[35vmax] ' src={image} alt="" /> */}
                        <h1 className='text-gray-400 font-bold text-[3vmin]'>No Orders Here</h1>
                    </div>
                )}
            </div>
        </section>
    )
}

export default MyOrders
