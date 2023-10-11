import { Button, Form, Input, Select } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import API from '../../API/Routes'


const SignUp = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const signUp = async (data) => {
        API.SignUp({ data }).then((response) => {
            if (response.userData) {
                dispatch({
                    type: 'LOGIN',
                    payload: response.userData
                })
                navigate("/")
            }
        })
    }

    const { Item } = Form
    const { TextArea } = Input
    return (
        <div className=' py-4 flex flex-col justify-center items-center w-[95vw]  md:w-[80vw] rounded-xl min-h-[50vh] space-y-7 card-bg '>
            <h1 className='font-bold w-[100%] text-green-500 text-[5vmin] text-center ' style={{ fontFamily: 'Righteous ,cursive' }} >Create Your E-commerce Account</h1>
            <Form className='w-[90%] space-y-5 flex flex-col justify-center' onFinish={signUp} onFinishFailed >
                <div className='flex space-x-3'>
                    <Item name={'firstName'} label='Enter Your First Name' rules={[{
                        required: true,
                        message: 'Please Enter Your First Name'
                    }]} >
                        <Input type='string' />
                    </Item>
                    <Item name={'lastName'} label='Enter Your Last Name' rules={[{
                        required: true,
                        message: 'Please Enter Your Last Name'
                    }]} >
                        <Input type='string' />
                    </Item>
                </div>
                <Item name={'password'} label='Enter Your Password' rules={[{
                    required: true,
                    message: 'Please Set a Strong Password!'
                }]}>
                    <Input.Password />
                </Item>
                <div className='flex flex-col md:flex-row justify-between md:space-x-4'>
                    <Item name={'phoneNumber'} label='Enter Your Phone Number' rules={[{
                        required: true,
                        message: 'Please Enter Your Mobile Number'
                    }]}>
                        <Input prefix={'+91'} type='number' />
                    </Item>
                    <Item name={'email'} label='Enter Your E-mail Address'>
                        <Input />
                    </Item>

                </div>

                <Item name={'address'} label='Set Your Address' rules={[{
                    required: true,
                    message: 'Set Your Address'
                }]}>
                    <TextArea />
                </Item>
                <Item name={'city'} required label='City' >
                    <Select disabled options={[{ key: 1, label: 'Bhopal', value: 'Bhopal' }]} defaultValue={'Bhopal'} >

                    </Select>
                </Item>
                <Item className='w-full flex justify-center'>
                    <Button htmlType='submit' className='bg-green-400 text-white'>Sign Up</Button>
                </Item>
            </Form>
        </div>
    )
}

export default SignUp
