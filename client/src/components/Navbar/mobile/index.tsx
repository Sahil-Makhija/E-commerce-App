import { Drawer } from 'antd'
import React , {useState} from 'react'
import { BiMenu } from 'react-icons/bi'
import Logo from '../Logo'

const NavDrawer:React.FC = () => {
    const [drawer,setDrawer] = useState<boolean>(false)
  return (
    <div className='lg:hidden'>
        <Drawer placement='left' style={{width:'80vw'}} title={<Logo src='' />} open={drawer} onClose={()=>setDrawer(false)}  ></Drawer>
        <button onClick={()=>setDrawer(true)} className='h-10 w-10 aspect-square rounded-full border-gray flex-center' >
            <BiMenu size={25} />
        </button>
    </div>
  )
}

export default NavDrawer