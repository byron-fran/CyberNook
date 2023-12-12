import React from 'react'
import { NavLink } from 'react-router-dom'


const FormPage = () => {

    return (
        <div className='w-full h-full overflow-y-scroll col-span-3 relative'>
            <nav className=' w-[95%] mx-auto flex flex-col  md:flex-row  h-full justify-center items-start mt-4 gap-4 relative'>
                <NavLink to='/admin/create-product' className='border border-slate-400 w-[90%] mx-auto h-[200px]'>
                    Create Product
                </NavLink>
                <NavLink to='/admin/create-category' className='border border-slate-400   w-[90%] mx-auto h-[200px]'>
                    Create Category
                </NavLink>
            </nav>

        </div>
    )
}

export default FormPage