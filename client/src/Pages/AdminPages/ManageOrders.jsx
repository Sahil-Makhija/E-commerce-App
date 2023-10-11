import {  Table, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import API from '../../API/Routes'

const ManageOrders = () => {
  const [dataSource, setDataSource] = useState(null)


  useEffect(() => {
    API.GetAllOrders().then((response)=>{
      if (response.allOrdersData){setDataSource(response.allOrdersData)}
    })
  }, [])

  const columns = [
    {
      key:1,
      title: 'S.No',
      render: (text, record, index) => {
        return (<h3>{index + 1}</h3>)
      }
    },
    {
      key:2,
      title: 'Order Placed',
      dataIndex: 'orderDate'
    },
    {
      key:3,
      title:'Full Name',
      dataIndex:'fullName'
    },
    {
      key:4,
      title:'Contact No.',
      dataIndex:'phoneNumber'
    },
    {
      key:5,
      title: 'Customer Address',
      dataIndex: 'address'
    },
    {
      key:6,
      title: 'Status',
      dataIndex: 'orderStatus',
      render: (_, record) => {
        return (<Tag color='blue' >{record.orderStatus}</Tag>)
      }
    },
    {
      key:7,
      title:'Items',
      dataIndex:'orderItems',
      render:(_,record)=>(
        `View list of ${record.orderItems.length}`
      )
    },
    {
      key:8,
      title: 'Total Amt (in Rs.)',
      dataIndex: 'orderAmount'
    },
    {
      key:9,
      title:'Payment Method',
      dataIndex:'modeOfPayment'
    },
    {
      key:10,
      title:'Delivery Date',
      dataIndex:'expectedDeliveryDate'
    }
    

  ]
  return (
    <>
      <Table
        className='border-2 border-black w-[100%]'
        dataSource={dataSource}
        columns={columns}
      ></Table>
    </>
  )
}

export default ManageOrders
