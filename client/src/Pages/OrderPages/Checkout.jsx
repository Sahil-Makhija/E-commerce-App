import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Col, Form, Radio, Row, Steps, Typography, message } from 'antd'
import DrawerCard from '../components/DrawerCard'
import cartForLocalStorage from '../../utils/cartForLocalStorage'
import { useNavigate } from 'react-router-dom'
import Errorpage from '../StaticPages/Errorpage'
import API from '../../API/Routes'


const Checkout = () => {
    const dispatch = useDispatch()
    const [step, setStep] = useState(0)
    const stepItems = [
        {
            title: 'Select a Delivery Address'
        },
        {
            title: 'Payment Method'
        },
        {
            title: 'Review Items and Delivery'
        },
    ]



    const { Group } = Radio
    const [messageApi, contextHolder] = message.useMessage()
    const navigate = useNavigate()


    const { firstName, lastName, phoneNumber, address, _id, isLoggedIn } = useSelector(state => state.User)
    const { cart } = useSelector(state => state.cart)


    const setContent = () => {
        switch (step) {
            case 1:
                return (<div className='w-[80%] flex justify-center'>
                    <Form.Item   >
                        <Group onChange={(e) => {
                            setMop(e.target.value)
                        }}
                            className='flex flex-col space-y-3' >
                            <Radio className='w-[30vw] lg:w-full ' value={'CashOnDelivery'}> <span className='font-bold text-[2.5vmin] '> Cash on Delivery</span></Radio>
                        </Group>
                    </Form.Item>

                </div>)
            case 2:
                return

            default:
                return (<div className='rounded-lg bg-white p-2 space-y-2 text-center h-auto w-auto' >
                    <h1 className='text-xl' >{firstName + ' ' + lastName}</h1>
                    <h2 className=' text-lg ' >Phone number: +91 {phoneNumber}</h2>
                    <h2 className='text-lg' >Address: {address + ' 462001 , India'}</h2>
                </div>)
        }
    }

    useEffect(() => {
        if (cart?.length < 1) { navigate('/') }
    }, [cart, navigate])

    const placeOrder = (firstName, lastName, phoneNumber, user_id, cartObj, address, modeOfPayment) => {
        const cart = cartForLocalStorage(cartObj)
        let d = new Date()
        const orderDate = d.toLocaleDateString()
        const orderDetails = {
            fullName: firstName + ' ' + lastName,
            phoneNumber,
            user_id,
            orderItems: cart,
            address,
            modeOfPayment,
            orderDate,
        }

        API.PlaceOrder(orderDetails).then((response) => {
            dispatch({
                type: 'NEW_ORDER',
                payload: response
            })
            navigate("/user/order/status")
        })
    }
    const [mop, setMop] = useState(null)
    var total = 0
    cart?.map((item) => {
        total = total + item.price * item.qty
        return null
    })
    if (isLoggedIn && cart.length >= 1) {
        return (
            <section className='min-h-[70vh] card-bg w-[90vw] p-4 relative ' >
                <h1 className='text-gradient text-[35px] font-bold mb-6 text-center ' >Checkout</h1>
                <div className=' flex flex-col items-center'>
                    <Steps className='mb-10' items={stepItems} current={step} />
                    {setContent()}

                </div>
                <button className='bg-green-400 hover:border-2 duration-500 p-1 w-24 absolute bottom-2 right-2 h-10 rounded-md text-white hover:border-green-600 hover:bg-white hover:text-green-500 ' onClick={() => setStep(step + 1)}   >Next</button>
            </section>
        )
    }
    else {
        return (<Errorpage nav={false} msg={'You need to login to access this page'} />)
    }
}

export default Checkout
