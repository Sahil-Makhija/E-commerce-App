import { Table, Button, Popconfirm, Modal, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import API from '../../API/Routes'

const ManageProducts = () => {
    const [dataSource, setDataSource] = useState(null)
    const [modalState, setModalState] = useState(false)
    const [messageApi, contextHolder] = message.useMessage()
    var reload = 0
    useEffect(() => {
        API.GetAllProducts().then((response) => {
            if (response.allProductData) {
                setDataSource(response.allProductData)
            }
        })
    }, [reload])
    const navigate = useNavigate()

    const columns = [
        {
            title: 'S.No',
            render: (text, record, index) => {
                return (<h3>{index + 1}</h3>)
            }
        },
        {
            title: 'productID',
            dataIndex: '_id'
        },
        {
            title: 'Product Name',
            dataIndex: 'productName',
            render: (_, record) => {
                return (
                    <>
                        <Link to={'/product/' + record.slug}>{record.productName}</Link>
                    </>
                )
            }
        },
        {
            title: 'Product Category',
            dataIndex: 'productCategory'
        },
        {
            title: 'Available Stock',
            dataIndex: 'stock'
        },
        {
            title: 'Selling Price',
            dataIndex: 'productSP'
        },
        {
            title: 'Manage',
            render: (_, record) => {
                return (
                    <div className='flex spave-x-2'>
                        <Popconfirm title='Edit this product ?'
                            okButtonProps={{ className: 'bg-blue-500' }}
                            onConfirm={() => navigate(`/admin/product/update/${record.slug}`)}
                        >
                            <Button type='link'>Edit</Button>
                        </Popconfirm>

                        <Button onClick={() => { setModalState(true) }} danger type='primary'>Delete</Button>
                        <Modal
                            title='Warning'
                            open={modalState}
                            onCancel={() => { setModalState(false) }}
                            okButtonProps={{ danger: true }}
                            onOk={() => {
                                API.DeleteProduct({ slug: record.slug }).then((response) => {
                                    if (response.status) {
                                        reload++ ;
                                        messageApi.success({content: response.message});
                                    }
                                    else {
                                        messageApi.error({content: response.message})
                                    }
                                })
                                setModalState(false)
                            }}
                        >
                            <h1>This Action cannot be undone. Continue ?</h1>
                        </Modal>
                    </div>
                )
            }
        }

    ]

    return (
        <>
            {contextHolder}
            <div className='w-full flex flex-col items-center space-y-10 justify-center my-5'>
                <Link to={'/admin/product/new'}><Button type='primary' className='bg-blue-500'>Add new product</Button></Link>
                <Table
                    className='border-2 border-black w-[90%]'
                    dataSource={dataSource}
                    columns={columns}
                ></Table>

            </div>
        </>
    )
}

export default ManageProducts
