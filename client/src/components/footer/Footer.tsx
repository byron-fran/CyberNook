
import { NavLink } from 'react-router-dom'

const Footer = () => {

    return (
        <footer className='w-full bg-slate-200 p-4 mt-10'>
            <div className='flex flex-col items-center md:flex-row md:justify-around'>
                <nav className='flex flex-col items-center justify-center mt-4'>
                    <h2 className='text-center font-bold'>Category</h2>
                    <NavLink to=''> Phones </NavLink>
                    <NavLink to=''> Laptops </NavLink>
                    <NavLink to=''> Pc Gamers </NavLink>
                    <NavLink to=''> Cameras </NavLink>
                    <NavLink to=''> monitors </NavLink>
                </nav>
                <nav className='flex flex-col items-center justify-center mt-4'>
                    <h2 className='text-center  font-bold'>Us</h2>
                    <NavLink to=''> History </NavLink>
                    <NavLink to=''>  Work with us </NavLink>
                    <NavLink to=''> location </NavLink>
                    <NavLink to=''> Terminos y condiciones </NavLink>
                    <NavLink to=''> Privacy Policy </NavLink>
                </nav>
                <nav className='flex flex-col items-center justify-center mt-4'>
                    <h2 className='text-center font-bold'>Support</h2>
                    <NavLink to=''>Help </NavLink>
                    <NavLink to=''>Payment Method </NavLink>
                    <NavLink to=''> Customer Support </NavLink>
                    <NavLink to=''> Terminos y condiciones </NavLink>
                    <NavLink to=''> Returns and Delivery </NavLink>

                </nav>
            </div>
            <p className='mt-4 text-center font-bold border-t border-t-slate-300 w-full pt-4'>All rights reserved 2023</p>
        </footer>
    )
}

export default Footer