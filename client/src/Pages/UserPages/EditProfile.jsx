import { DeleteFilled, EditTwoTone } from '@ant-design/icons'
import { Form, Input, Button, Popconfirm, message } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import API from '../../API/Routes'

const EditProfile = () => {
    const navigate = useNavigate()
    const [messageApi, contextHolder] = message.useMessage()
    const { Item } = Form
    const [form] = Form.useForm()
    const oldUserData = useSelector(state => state.User)
    console.log(oldUserData);
    form.setFieldsValue({
        ...oldUserData
    })
    const { _id } = oldUserData


    const editProfile = async (data) => {
        API.UpdateProfile({ data, id: _id }).then((response) => {
            if (response.status) {
                messageApi.success({ content: response?.data.success })
                navigate('/')
            }
            else { messageApi.error({ content: response.error }) }
        })
    }

    const deleteAccount = () => {
        API.DeleteProfile({id:_id}).then((response)=>{
            if (response.status){
                messageApi.success({ content: response.data?.success })
                navigate('/')
            }
            else { messageApi.error({ content: response.data?.error }) }
        })
    }

    return (

        <section className=' py-1 lg:w-[60vw] lg:h-[80vh] border-black bg-white border-2 rounded-lg  absolute flex flex-col justify-evenly items-center space-y-3 z-10 ' >
            {contextHolder}
            <h1 className='text-green-500 font-bold text-[5vmin]'  >Edit Your Profile</h1>
            <Form form={form} className='space-y-5 flex flex-col justify-center' onFinish={editProfile}  >
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
                <Item className='w-full flex justify-center'>
                    <Button htmlType='submit' className='bg-green-400 text-white outline-white flex items-center '>Edit Profile <EditTwoTone type='primary' /></Button>
                </Item>
                <div className='flex flex-col justify-center items-center' >
                    <Popconfirm title='Are you sure ?' okType='link' onConfirm={deleteAccount}>
                        <Button className='lg:w-[20%] mb-5 flex items-center justify-center ' danger type='primary' >Delete My Account <DeleteFilled /></Button>
                    </Popconfirm>
                    <Link className='w-[12%] ' to={'/user/profile'}><Button type='primary' className='bg-blue-500 lg:w-[100%] ' >Back</Button></Link>
                </div>
            </Form>
        </section>
    )
}

export default EditProfile
