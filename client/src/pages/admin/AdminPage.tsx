import Sidebar from '../../components/admin/Sidebar';
import { Outlet } from 'react-router-dom';
import NavProfile from '../../components/navbar/NavProfile';
import { useEffect } from 'react';
import { getAllReviewsThunk } from '../../redux/thunks/ReviewsThunk';
import { getAllOrdersByAdmin } from '../../redux/thunks/OrdersThunks';
import { getAllUsers } from '../../redux/thunks/UsersThunk';
import { useAppDispatch } from '../../redux/hooks/hooks';

const AdminPage = () => {

  const dispatch = useAppDispatch();
  useEffect(() => {
      
      dispatch(getAllOrdersByAdmin())
      dispatch(getAllUsers());

  }, [])


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