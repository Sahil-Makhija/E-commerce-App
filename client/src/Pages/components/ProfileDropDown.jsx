import { DownOutlined, LogoutOutlined, UserOutlined, GiftOutlined } from '@ant-design/icons';
import { Dropdown } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User_Logout } from '../../redux/reducers/userReducer';

const ProfileDropDown = () => {
  const dispatch = useDispatch()

  
  const items = [
    {
      key: '1',
      label: (
        <Link to="/user/profile">
          Your Profile
        </Link>
      ),
      icon: <UserOutlined />
    },
    {
      key: '2',
      label: (
        <Link to="/user/orders">
          Your Orders
        </Link>
      ),
      icon: <GiftOutlined />
    },
    {
      key: '3',
      label: (
        <Link to={'/'} onClick={() => dispatch(User_Logout())} >
          Logout
        </Link>
      ),
      icon: <LogoutOutlined />
    }
  ];
  const { firstName } = useSelector(state => state.User)
  return (
    <>
      <Dropdown
        menu={{ items }}
        placement='bottom'
      >
        <div className='flex items-center  space-x-2  '>
          <span className='text-[2.5vmin]  ' > Hii , {firstName}</span>
          <DownOutlined  className='text-[2.5vmin]' />
        </div>
      </Dropdown>
    </>
  )
}
export default ProfileDropDown;