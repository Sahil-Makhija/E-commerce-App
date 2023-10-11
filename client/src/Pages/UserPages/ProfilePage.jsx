import { Button, Descriptions, Empty } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import loginWithCookie from '../../utils/loginWithCookie'
import { Link, Outlet } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
import DrawerCard from '../components/DrawerCard'
// import image from '../../images(test)/empty-cart.png'
import Errorpage from '../StaticPages/Errorpage'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const { firstName, lastName, isLoggedIn, email, phoneNumber, address } = useSelector(state => state.User)
    const { cart } = useSelector(state => state.Cart)
    loginWithCookie(isLoggedIn, dispatch)
    if (cart[0]) { var empStatus = false }
    else { empStatus = true }
    const { Item } = Descriptions
    if (isLoggedIn) {
        return (
            <section className='flex flex-col justify-center items-center mt-5 space-y-16 relative '>
                <Outlet/>
                <div className='w-[90%] lg:w-[70%] rounded-md space-y-2 bg-white  p-2 relative ' >
                    <Link className='flex items-center absolute right-6 ' to='/user/profile/edit'>Edit <EditOutlined /></Link>
                    <Descriptions title='Your Profile'>
                        <Item className='w-full' label='username'>{firstName + ' ' + lastName}</Item>
                        <Item className='w-full' label='email address'>{email}</Item>
                        <Item className='w-full' label='Mobile Number' >+91 {phoneNumber}</Item>
                        <Item className='w-full' label='password'>********<Link to='/user/profile/edit/password'><Button className='bg-green-500 mx-5 text-white '>Change Password</Button></Link></Item>
                        <Item className='w-full' label='address' >{address}</Item>
                    </Descriptions>
                </div>
                
                <div className="flex flex-col  space-y-3 w-[90%] bg-white lg:w-[70%] justify-center relative  p-3">
                    <h2 className='w-[100%] text-[4vmin]   lg:text-[3vmin]' >Your Cart</h2>
                    {empStatus && (<div className='flex flex-col items-center justify-center'>
                        {/* <Empty description='Your cart is empty' image={image} /> */}
                        <Link to={'/'}>
                            <Button type='primary' className='bg-green-500  my-2'>Browse Items</Button>
                        </Link>
                    </div>)}
                    {!empStatus && cart.map((item) => (
                        <div className='lg:w-[60%]'>
                            <DrawerCard itemData={item} />
                        </div>
                    ))}
                    {!empStatus && (
                        <Link to='/user/checkout'>
                            <Button disabled={!isLoggedIn} className='bg-green-400 text-white lg:w-[20vmax] absolute right-5 bottom-2'>Proceed To Checkout</Button>
                        </Link>
                    )}
                </div>
            </section>
        )
    }
    else {
        return (
            <Errorpage msg={'Please Login first'} />
        )
    }
}

export default ProfilePage
