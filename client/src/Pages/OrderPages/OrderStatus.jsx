import { Button, Result } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const OrderStatus = () => {
  const dispatch = useDispatch()
  const orderData = useSelector(state=>state.order)
  const {status,message} = orderData
  if (status){
    dispatch({
      type:'EMPTY_CART'
    })
  }
  return (
    <div >
      <Result 
      status={status ? 'success':'error'}
      title={message}
      subTitle={status?('order_ID :'+orderData.orderData?._id):orderData?.error}
      extra={[
        <Link hidden={!status} to={'/user/orders'}><Button type='primary' className='bg-blue-500'>View Your Order</Button></Link>,
        <Link to={'/'}><Button type='primary' className='bg-blue-500'>Go Home</Button></Link>,

      ]}
       />
    </div>
  )
}

export default OrderStatus
