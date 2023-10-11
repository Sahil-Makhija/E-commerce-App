import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Outlet } from 'react-router-dom'
import AdminCookieLogin from '../../utils/AdminCookieLogin'

const Admin = () => {
  const dispatch = useDispatch()
  const { isAdmin, adminName } = useSelector(state => state.admin)
  AdminCookieLogin(isAdmin,dispatch)

  if (isAdmin) {
    return (
      <>
        <nav className='h-[10vmin] border-b-[1px] flex items-center px-10 justify-between'>
          <div className='flex space-x-2'>

            <Link to='/admin'><h1 className=' text-[4vmin] text-[#1565C0] ' style={{ fontFamily: 'Righteous ,cursive' }}>E-commerce App</h1></Link>

          </div>
          <div className='flex space-x-2'>
            <h1 className='font-bold text-[3vmin] text-green-500'>Welcome, Admin {adminName}</h1>
          </div>
        </nav>
        <Outlet />
      </>
    )
  }
  else{
    
    return(
      <div className='w-full min-h-[80vh] flex flex-col justify-center items-center'>
            <h1>You are not authenticated to access this page!</h1>
            <Link to={'/admin/login'}>Login as Admin</Link>
            </div>
    )
  }
}

export default Admin
