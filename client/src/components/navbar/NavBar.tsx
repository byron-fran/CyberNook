import { useAppSelector } from '../../redux/hooks/hooks';
import { NavLink, Outlet } from 'react-router-dom'
import SearchBar from '../searchBar/SearchBar';
import Footer from '../footer/Footer';
import NavCategories from './NavCategories';
import { calculateTotalQuantity } from '../../helpers/cart/totalQuantity';

const NavBar = () => {

    const { isAuthenticated, user, } = useAppSelector(state => state.auth);
    const {cart} = useAppSelector(state => state.cart);
    const  totalQuantity = calculateTotalQuantity(cart);
    
    return (
        <>
            <main className='flex gap-4 justify-around items-center w-full bg-blue-800 p-4 relative'>
                <div className='flex flex-col w-full'>
                    <div className=' flex flex-col md:flex-row justify-between w-[95%] mx-auto md:w-[85%] '>
                        <NavLink to='/'>
                            <h1 className='text-white text-center md:text-left text-2xl md:text-4xl md:font-bold '>CyberNook</h1>
                        </NavLink>
                        <nav className='flex gap-2 justify-center'>
                            {isAuthenticated ? (
                                <div className='flex gap-8 items-center'>

                                    <NavLink to='/cart' className='flex gap-2 items-center justify-center'>
                                        <img className=' w-8' src="/images/cart.svg" alt="image cart" />
                                        {totalQuantity > 0 ? (
                                            <p className='bg-white text-blue-600 py-1 px-2 font-bold rounded-full'>{totalQuantity}</p>
                                        ): null}

                                    </NavLink>

                                    <NavLink to='/profile'>
                                        <img className='w-[35px] ' src="/images/user.svg" alt="image-user" />
                                    </NavLink>
                                    <p className='text-white'>Hello, {user?.name}</p>
                                    {user?.isAdmin && (
                                        <NavLink to='/admin'>
                                            <img className='w-[30px] mt-2' src="/images/admin.png" alt="img-admin" />

                                        </NavLink>
                                    )}

                                </div>
                            ) :
                                <>
                                    <NavLink className='text-white' to='/login'> Login </NavLink>
                                    <NavLink className='text-white' to='/register'>Register</NavLink>
                                </>
                            }

                        </nav>
                    </div>
                    <SearchBar />
                </div>
            </main>

            <NavCategories />
            <Outlet />
            <Footer />
        </>
    )
}

export default NavBar