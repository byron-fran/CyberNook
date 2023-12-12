import React from 'react'
import Sidebar from '../../components/admin/Sidebar';
import {Outlet} from 'react-router-dom';


const AdminPage = () => {


  return (
    <main className='w-full grid md:grid-cols-4'>
        <Sidebar/>
        <Outlet/>
    </main>
  )
}

export default AdminPage