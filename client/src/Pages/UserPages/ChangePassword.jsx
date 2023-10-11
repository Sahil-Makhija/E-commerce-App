import { Button, Form, Input, message } from 'antd'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import API from '../../API/Routes'

const ChangePassword = () => {
    const { Item } = Form
    const validateConfirmPassword = (_, value) => {
        return new Promise((resolve, reject) => {
            if (value !== (document.getElementById('newPassword').value)) { reject('Passwords do not match!') }
            else { resolve() }
        })
    }
    const [messageApi, contextHolder] = message.useMessage()
    const { _id } = useSelector(state => state.User)

    const ChangePassword = (data) => {
        API.UpdatePassword({ data, id: _id }).then((response) => {
            if (response.status) {
                messageApi.success({ content: response?.success || 'Password Updated Successfully!' })
            }
            else {messageApi.error({ content: response?.error })}
        })
    }
    return (
        <section className='w-[30vw] h-[80vh] border-black bg-white border-2 rounded-lg z-10 absolute flex flex-col justify-center items-center ' >
            {contextHolder}
            <h1 className='text-green-500 font-bold text-[5vmin]'>Change Password</h1>
            <Form className='flex flex-col items-center' onFinish={ChangePassword}>
                <Item validateTrigger={true} className='w-[90%] my-10 ' label='Enter your old password' name={'oldPassword'}>
                    <Input.Password required className='w-[90%]' />
                </Item>
                <Item className='w-[90%] my-10 ' id='newPassword' label='Enter your new password' name={'newPassword'}>
                    <Input.Password required className='w-[90%]' />
                </Item>
                <Item rules={[{ validator: validateConfirmPassword }]} className='w-[90%] my-10 ' label='Confirm your password' name={'confirmPassword'}>
                    <Input.Password required className='w-[90%]' />
                </Item>
                <Button type='primary' className='bg-blue-500' htmlType='submit'>Change Password</Button>
                <Link to='/user/profile'><Button className='text-blue-500 my-5'>Go Back</Button></Link>
            </Form>
        </section>
    )
}

export default ChangePassword
