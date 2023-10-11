import React from 'react'
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import shortenString from '../../utils/shortenStr';

const DrawerCard = ({ itemData }) => {
    const dispatch = useDispatch()
    const removeFromCart = () => {
        dispatch({
            type: 'REMOVE_ITEM',
            payload: itemData.productID
        })
    }
    const addUnit = () => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                ...itemData,
                qty: 1
            }
        })
    }
    const removeUnit = () => {

        if (itemData.qty === 1) {
            return
        }
        else {
            dispatch({
                type: 'ADD_ITEM',
                payload: {
                    ...itemData,
                    qty: -1
                }
            })
        }
    }
    return (

        <div to={`/product/${itemData.slug}`} className='flex overflow-hidden justify-between max-h-[20vh] min-h-[20vh] space-x-2  rounded-md card-bg p-1 '>
            <div className='max-h-[100%] max-w-[40%]  flex justify-center items-center '>
                <img className='max-h-[100%] ' alt={itemData.productName} src={itemData.image} />
            </div>
            <div className=' relative flex flex-col justify-evenly ' >
                <Link to={`/product/${itemData?.slug}`} className=' text-[1rem]'>{shortenString(itemData.productName)}</Link>
                <div className='flex  w-[100%] justify-evenly'>
                    <div className='font-bold flex space-y-1 space-x-3 items-start '>
                        <button onClick={() => { addUnit() }}><PlusCircleOutlined /></button>
                        <p> qty: {itemData.qty}</p>
                        <button disabled={itemData.qty === 1 ? true : false} onClick={() => { removeUnit() }}><MinusCircleOutlined /></button>
                    </div>
                    <div className="flex  "><button className='bg-red-500 p-1 rounded-sm text-white' onClick={() => { removeFromCart() }} >Remove</button>
                </div> 
                </div>
                <span className='font-bold text-green-500 text-lg'>Total Price: &#8377; {(itemData.price * itemData.qty).toLocaleString('en-IN')}</span>
                {/* <div className="flex absolute bottom-1 right-1  "><button className='bg-red-500 p-1 rounded-sm text-white' onClick={() => { removeFromCart() }} >Remove</button>
                </div> */}
            </div>

        </div>
    )
}

export default DrawerCard
