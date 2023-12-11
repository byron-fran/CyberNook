import { useAppSelector } from '../../redux/hooks/hooks';
import { NavLink, useNavigate, Outlet } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks/hooks';
import { logOutUserThunk } from '../../redux/thunks/AuthThunk';
import SearchBar from '../searchBar/SearchBar';



const NavBar = () => {
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    const { isAuthenticated, user } = useAppSelector(state => state.auth)

    const hanldeLogOut = () => {
        dispatch(logOutUserThunk())
            .then(() => {
                Navigate('/login')
            })
            .catch((error) => {
                return error
            })
    }
    return (
        <>
            <main className='flex gap-4 justify-around items-center w-full bg-blue-800 p-4 '>
                <div className='flex flex-col w-full'>
                    <div className='flex justify-between w-[95%] mx-auto md:w-[70%] '>
                        <NavLink to='/'>
                            <h1 className='text-white text-2xl md:text-4xl md:font-bold'>CyberNook</h1>
                        </NavLink>
                        <nav className='flex gap-2'>
                            {isAuthenticated ? (
                                <div className='flex gap-8 items-center'>

                                    <p className='text-white'>Hello, {user?.name}</p>
                                    <NavLink className='text-white' onClick={hanldeLogOut} to='/login'>Logout</NavLink>
                                    <NavLink to='/cart'>
                                          <img className=' w-8' src="/images/cart.png" alt="image cart" />
                                    </NavLink>
                                  
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
            <Outlet/>
        </>
    )
}

export default NavBar