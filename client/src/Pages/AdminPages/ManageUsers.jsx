import { Button, Modal, Table, message } from 'antd'
import React, { useEffect, useState } from 'react'
import API from '../../API/Routes'

const ManageUsers = () => {
  const [dataSource, setDataSource] = useState(null)
  const [modalState, setModalState] = useState(false)
  const [messageApi, contextHolder] = message.useMessage()
  var reload = 0

  const columns = [
    {
      title: 'S.No',
      render: (text, record, index) => {
        return (<h3>{index + 1}</h3>)
      }
    },
    {
      title: 'userID',
      dataIndex: '_id'
    },
    {
      title: 'Full Name',
      render: (_, record) => {
        return (<h1>{record.firstName + ' ' + record.lastName}</h1>)
      }
    },
    {
      title: 'Mobile Number',
      dataIndex: 'phoneNumber'
    },
    {
      title: 'Address',
      dataIndex: 'address'
    },
    {
      title: 'Email Address',
      dataIndex: 'email'
    },
    {
      title: '',
      dataIndex: ''
    },
    {
      title: 'Orders Placed',
      render: (_, record) => (record.ordersCompleted.length)
    },
    {
      title: 'Orders Cancelled',
      render: (_, record) => (record.ordersCanceled.length)

    },
    {
      title: 'Manage',
      render: (_, record) => {
        return (<>
          <Button onClick={() => { setModalState(true) }} danger type='primary'>Delete</Button>
          <Modal
            title='Warning'
            open={modalState}
            onCancel={() => { setModalState(false) }}
            okButtonProps={{ danger: true }}
            onOk={() => {
              API.DeleteUser({ id: record._id }).then((response) => {
                if (response.status) {
                  reload = reload + 1
                  messageApi.success({ content: response.message, });
                }
                else {
                  messageApi.error({ content: response.message })
                }
              })
              setModalState(false)
            }}
          >
            <h1>This Action cannot be undone. Continue ?</h1>
          </Modal >
        </>)
      }
    }
  ]

  useEffect(() => {
    API.GetAllUsers().then((response) => {
      if (response.allUsersData) {
        setDataSource(response.allUsersData)
      }
    })
  }, [reload])
  return (
    <>
      {contextHolder}
      <Table
        columns={columns}
        dataSource={dataSource}
      ></Table>
    </>
  )
}

export default ManageUsers
