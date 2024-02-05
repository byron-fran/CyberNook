
import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    return (
        <div className='border border-slate-300 w-full col-span-1 p-4 md:h-screen '>
            <nav className='w-full  flex justify-around flex-wrap gap-4 md:flex-col md:gap-2 md:justify-start md:mt-4 md:pt-4 '>
                <NavLink  className='text-blue-800  uppercase' to='/admin'>
                    Crear
                </NavLink>
                <NavLink  className='text-blue-800 uppercase md:mt-2' to='/admin/products'>
                    Productos
                </NavLink>
                <NavLink  className='text-blue-800 uppercase  md:mt-2' to='/admin/orders'>
                    Orders
                </NavLink>
                <NavLink  className='text-blue-800 uppercase  md:mt-2' to='/admin/users'>
                    Users
                </NavLink>
                <NavLink  className='text-blue-800  uppercase  md:mt-2' to='/admin/reviews'>
                    Reviews
                </NavLink>
                <NavLink  className='text-blue-800  uppercase  md:mt-2' to='/admin/sales'>
                    Sales
                </NavLink>
         
            </nav>
        </div>
    )
}

export default Sidebar