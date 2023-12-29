import Sidebar from '../../components/admin/Sidebar';
import { Outlet } from 'react-router-dom';
import NavProfile from '../../components/navbar/NavProfile';

const AdminPage = () => {


  return (
    <>
      <NavProfile namePanel='Admin Panel'/>
      <main className='w-full grid md:grid-cols-4'>

        <Sidebar />
        <Outlet />
       
      </main>
    </>

  )
}

export default AdminPage