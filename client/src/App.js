import { Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './Pages/components/Navbar';
import { Layout } from 'antd';
import Footer from './Pages/components/Footer';

const App = () => {
  return (
    <div className=' flex flex-col overflow-x-hidden bg-white min-h-screen  '>
      <Navbar />
      <Layout className='bg-transparent min-h-[80vh] py-3 flex-col flex items-center justify-center '>
        <Outlet />
      </Layout>
      <Footer/>
    </div>
  );
}

export default App;
