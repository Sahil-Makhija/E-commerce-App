
//TODO : retrieve this info while logging in as Admin

import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import API from '../../API/Routes'

const AdminDashboard = () => {
  const [userCount, setUserCount] = useState("50")
  const [productCount, setProductCount] = useState("50")
  const [ordersPending, setOrdersPending] = useState("50")

  API.GetAdminStats().then((response) => {
    setOrdersPending(response.ordersPending)
    setProductCount(response.productCount)
    setUserCount(response.userCount)
  })

  return (
    <>
      <main className='flex flex-col justify-center items-center my-2 p-2'>
        <section className='flex space-x-5'>
          <div className="flex flex-col rounded-[50%] h-[10vmax] w-[10vmax] bg-pink-500 justify-center items-center text-white font-bold">
            <h2>Users : </h2>
            <i>{userCount} users</i>

          </div>
          <div className="flex flex-col rounded-[50%] h-[10vmax] w-[10vmax] bg-sky-400 justify-center items-center text-white font-bold">
            <h2>Products : </h2>
            <i>{productCount} products</i>
          </div>
        </section>
        <div className="flex flex-col rounded-[50%] h-[10vmax] w-[10vmax] bg-green-400 justify-center items-center text-white font-bold">
          <h2>Orders Pending : </h2>
          <i>{ordersPending} orders</i>
        </div>
        <section className='flex space-x-5 w-[100%] justify-evenly mt-6 '>
          <div className="admin-card bg-sky-400">
            <h1 className='font-bold text-[5vmin] text-center text-white '><Link to='/admin/manage/products'>Manage Products</Link> </h1>
          </div>

          <div className="admin-card bg-green-400">
            <Link to={'/admin/manage/orders'}><h1 className='font-bold text-[5vmin] text-white'>Manage Orders </h1></Link>
          </div>

          <div className="admin-card bg-pink-500">
            <Link to={'/admin/manage/users'}>
              <h1 className='font-bold text-[5vmin] text-white '>Manage Users </h1></Link>
          </div>

        </section>

      </main>
      <Outlet />
    </>
  )
}

export default AdminDashboard
