
import { NavLink } from 'react-router-dom'

const Footer = () => {

    return (
        <footer className='w-full bg-blue-800 p-4 mt-10'>
            <div className='flex flex-col items-center md:flex-row md:justify-around'>
                <nav className='flex flex-col items-center justify-center mt-4'>
                    <h2 className='text-center font-bold text-white'>Category</h2>
                    <NavLink className='text-white' to=''> Phones </NavLink>
                    <NavLink className='text-white' to=''> Laptops </NavLink>
                    <NavLink className='text-white' to=''> Pc Gamers </NavLink>
                    <NavLink className='text-white' to=''> Cameras </NavLink>
                    <NavLink className='text-white' to=''> monitors </NavLink>
                </nav>
                <nav className='flex flex-col items-center justify-center mt-4'>
                    <h2 className='text-center  font-bold text-white'>Us</h2>
                    <NavLink className='text-white' to=''> History </NavLink>
                    <NavLink className='text-white' to=''>  Work with us </NavLink>
                    <NavLink className='text-white' to=''> location </NavLink>
                    <NavLink className='text-white' to=''> Terminos y condiciones </NavLink>
                    <NavLink className='text-white' to=''> Privacy Policy </NavLink>
                </nav>
                <nav className='flex flex-col items-center justify-center mt-4'>
                    <h2 className='text-center font-bold text-white'>Support</h2>
                    <NavLink className='text-white' to=''>Help </NavLink>
                    <NavLink className='text-white' to=''>Payment Method </NavLink>
                    <NavLink className='text-white' to=''> Customer Support </NavLink>
                    <NavLink className='text-white' to=''> Terminos y condiciones </NavLink>
                    <NavLink className='text-white' to=''> Returns and Delivery </NavLink>

                </nav>
            </div>
            <p className='mt-4 text-center text-white font-bold border-t border-t-slate-200 w-full pt-4'>All rights reserved 2023</p>
        </footer>
    )
}

export default Footer