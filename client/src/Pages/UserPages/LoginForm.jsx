import { Form, Input, Button, message } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import loginWithCookie from '../../utils/loginWithCookie'
import API from '../../API/Routes'
import { login } from '../../redux/actions/userActions'

const LoginForm = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [messageApi, contextHolder] = message.useMessage()


    const { isLoggedIn } = useSelector(state => state.User)
    loginWithCookie(isLoggedIn, dispatch)


    // const login = async (data) => {
    //     dispatch(login())
        
    //     API.Login({ data }).then((response) => {
    //         const { status } = response
    //         if (status) {
    //             const {userData} = response
    //             navigate("/")
    //         }
    //         else {
    //             messageApi.error({ content: `${response.data?.error || 'Invalid Login Credentials!' }`  })

    //         }
    //     })
    // }
    const { Item } = Form
    return (
        <div className=' flex flex-col justify-evenly items-center  text-white bg-gradient-to-b from-white to-transparent rounded-xl w-[95%] md:w-[60%] min-h-[60vh] space-y-7 '>
            {contextHolder}
            <h1 className='font-bold w-[100%] text-gradient text-[5vmin] text-center ' style={{ fontFamily: 'Righteous ,cursive' }} >Login to Your E-commerce Account</h1>
            <Form onFinish={(data)=>{dispatch(login(data));}} className='md:w-[60%] w-[80%]  rounded-lg border-2  bg-white p-5 space-y-5 flex flex-col justify-center'>
                <Item name={'phoneNumber'} label='Enter Your Phone Number' rules={[{
                    required: true,
                    message: 'Please Enter Your Mobile Number'
                }]}>
                    <Input prefix={'+91'} type='number' />
                </Item>
                <Item name={'password'} label='Enter Your Password' rules={[{
                    required: true,
                    message: 'Please Set a Strong Password!'
                }]}>
                    <Input.Password />
                </Item>
                <Item className='w-full flex justify-center'>
                    <Button htmlType='submit' className='bg-green-400 text-white'>Log In</Button>
                </Item>
            </Form>
            <p className='text-black text-lg'>Don't have an account ? <Link className='text-green-400 underline' to={'/user/signup'}>Sign Up</Link></p>

        </div>
    )
}

export default LoginForm

