import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SearchOutlined, ShoppingCartOutlined, MenuOutlined, HomeFilled, RollbackOutlined } from '@ant-design/icons'
import { Button, Input, Drawer, Badge, Space, message } from 'antd'

import ProfileDropDown from './ProfileDropDown'
import DrawerCard from './DrawerCard'




const Navbar = () => {

    const [messageApi, contextHolder] = message.useMessage()

    const navigate = useNavigate()
    //
    const { isLoggedIn } = useSelector(state => state.User)

    //*Drawer Open/Close Logic
    const [cartOpen, setCartOpen] = useState(false)
    const [categoryOpen, setCategoryOpen] = useState(false)
    const { cart } = useSelector(state => state.Cart)
    //

    //*Total Amount to be paid
    var total = 0
    cart?.map((item) => {
        total = total + item.price * item.qty
        return null
    })
    //
    const handleSearch = () => {
        const searchTerm = document.getElementById('search').value
        if (searchTerm.length > 0) {
            navigate(`/get/product?search=${searchTerm}`)
        }

    }

    document.getElementById('search')?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            handleSearch()
        }
    })




    return (
        <>
            {contextHolder}
            <nav className=' min-h-[10vmin] rounded-lg flex items-center  justify-evenly card-bg bg-white  m-2 '>
                <Button onClick={() => { setCategoryOpen(true) }} className='nav-btn'><MenuOutlined /></Button>

                <Link to='/'><h1 className='text-gradient font-extrabold text-[5vmin]  ' style={{ fontFamily: 'Lexend, sans-serif' }}>E-commerce App</h1></Link>

                <Space.Compact id='search_space' className='w-[30%] flex '>
                    <Input spellCheck='false' autoCorrect='off' autoComplete='off' className='w-[80%] rounded-l-md border-none' placeholder='What are you looking for ?' type="text" name="search" id="search" />
                    <Button onClick={handleSearch} className='flex items-center rounded-r-md border-none bg-white '><SearchOutlined className='text-[90%]' /></Button>
                </Space.Compact>

                {isLoggedIn ? <ProfileDropDown /> :
                    <>
                        <Link className='md:w-[7%] ' to='/user/login'><button className='bg-green-400 hover:border-2 duration-500 p-1 w-[100%] h-[100%]  rounded-md text-white hover:border-green-600 hover:bg-white hover:text-green-500 '   >Log In</button></Link>
                    </>}
                <Badge id='cart' count={cart?.length} color='cyan' showZero>
                    <Button onClick={() => { setCartOpen(true) }} className=' nav-btn '><ShoppingCartOutlined className='text-[90%]' /></Button>
                </Badge>

                {/* Cart Drawer */}
                <Drawer style={{ padding: '0', position: 'relative' }} title="Your Cart" placement="right" onClose={() => setCartOpen(false)} open={cartOpen} >
                    {cart.length === 0 && (
                        <div className='w-[100%] h-[100%] flex flex-col justify-center items-center' >
                            {/* <img src={image} alt="" /> */}
                            <h1 className=' text-[3vmin] text-gray-400 font-bold font-mono'>Your Cart is Empty</h1>
                        </div>
                    )}
                    <div className='space-y-2'>
                        {cart.length !== 0 && cart.map((item) => (
                            <DrawerCard itemData={item} />
                        ))}
                    </div>
                    {cart.length > 0 && (<p className='bg-white absolute bottom-1  font-bold text-green-500 text-right w-[100%] right-0'>Total Amount : &#8377; {(total).toLocaleString('en-IN')}
                        <span onClick={() => !isLoggedIn && messageApi.error({ content: 'Login first to proceed' })} >
                            <Button onClick={() => {
                                setCartOpen(false)
                                isLoggedIn && navigate('/user/checkout')

                            }} disabled={!isLoggedIn} className='bg-green-400 mx-2 text-white'>Proceed To Checkout</Button>
                        </span>
                    </p>)}

                </Drawer>

                <div id='navigation' className=' h-[4vh] w-[80%] z-50 flex items-center justify-evenly  fixed bottom-1 bg-gradient-to-r from-green-600 to-green-400   rounded-2xl' >
                    <HomeFilled onClick={() => { navigate('/') }} className='text-white' />
                    <Badge color='green' count={cart.length} >
                        <ShoppingCartOutlined onClick={() => { setCartOpen(true) }} className='text-white' />
                    </Badge>
                    <RollbackOutlined className='text-white' />
                    <SearchOutlined className='text-white' />
                </div>

                {/* Category Drawer */}
                <Drawer drawerStyle={{ backgroundColor: '#ffffff00' }} title="Categories" placement="left" style={{ fontFamily: 'Righteous ,cursive' }} onClose={() => setCategoryOpen(false)} open={categoryOpen}  >

                    <div onClick={() => { setCategoryOpen(false) }} className='flex  flex-col h-full text-green-400 text-center items-center text-[9vmin] md:text-[5vmin]   justify-evenly '>
                        <p className='flex'  ><Link to={`/get/product?category=television`}><h2 className='text- text-gradient'>Televisions</h2></Link></p>
                        <p><Link to={`/get/product?category=cooler`}><h2 className=' text-gradient'>Coolers</h2></Link></p>
                        <p> <Link to={`/get/product?category=washing_machine`}><h2 className=' text-gradient'>Washing Machines</h2></Link></p>
                        <p><Link to={`/get/product?category=refrigerator`}><h2 className='text-gradient'>Refrigerators</h2></Link></p>
                        <p> <Link to={`/get/product?category=sewing_machine`}><h2 className='text-gradient'>Sewing Machines</h2></Link></p>
                    </div>
                </Drawer>
            </nav >
        </>
    )
}

export default Navbar
