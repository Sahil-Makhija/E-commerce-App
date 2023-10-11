//TODO : Retrieve authQuestion in One Request

import { Button, Form, Input, Modal, message } from 'antd'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import API from '../../API/Routes'

const AdminLogin = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [ques, setQues] = useState('question')
    const [messageApi, contextHolder] = message.useMessage()

    const [modalState, setModalState] = useState(false)
    const [adminName, setAdminName] = useState('')
    const [adminPassword, setAdminPassword] = useState('')


    const handleSubmit = (data) => {
        const { adminName, adminPassword } = data
        setAdminName(adminName)
        setAdminPassword(adminPassword)
        API.GetAuthQuestion({ data }).then((resposne) => {
            if (resposne.status) {
                setQues(resposne?.question)
                setModalState(true)
            }
            else { messageApi.error({ content: resposne.error }) }
        })
    }
    const { Item } = Form
    return (
        <>
            {contextHolder}
            <div className='flex flex-col w-full mt-10 justify-center items-center'>
                <Modal title='Authentication Question' open={modalState}
                    okButtonProps={{ hidden: true }}
                    onCancel={() => { setModalState(false) }}

                >
                    <Form onFinish={(values) => {
                        const { authAnswer } = values
                        const creds = {
                            adminName,
                            adminPassword,
                            authAnswer,
                            authQuestion: ques,

                        }
                        API.AdminLogin({ data: creds }).then((response) => {
                            if (response.status) {
                                setModalState(false)
                                navigate('/admin')
                                dispatch({
                                    type: 'ADMIN_LOGIN',
                                    payload: response.adminData
                                })
                            }
                            else {
                                messageApi.error({
                                    content: response.error
                                })
                            }
                        })
                    }}>
                        <Item name='authAnswer' label={ques} >
                            <Input autoComplete='off' />
                        </Item>
                        <Item className='w-full flex justify-center' >
                            <Button htmlType='submit' className='bg-blue-500' type='primary' >Submit</Button>
                        </Item>
                    </Form>
                </Modal>

                <h1 className='font-bold w-[100%] text-green-500 text-[5vmin] text-center ' style={{ fontFamily: 'Righteous ,cursive' }} >Login as Admin</h1>

                <Form onFinish={handleSubmit}  >
                    <Item name={'adminName'} className='my-10' label='Enter Admin Username'>
                        <Input autoComplete='off' />
                    </Item>
                    <Item name={'adminPassword'} className='my-10' label='Enter your password'>
                        <Input type='password' />
                    </Item>
                    <Item className='w-full flex justify-center' >
                        <Button className='bg-blue-500' type='primary' htmlType='submit' >Login as admin</Button>
                    </Item>
                </Form>

            </div>
        </>
    )
}

export default AdminLogin
