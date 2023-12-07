
import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../redux/hooks/hooks';
import { logOutUserThunk } from '../../redux/thunks/AuthThunk';

const NavBar = () => {
    const dispatch = useAppDispatch();
    const Navigate = useNavigate();
    
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
    <div>
        <nav>
            <NavLink 
            onClick={hanldeLogOut}
            to='/login'>Logout</NavLink>

        </nav>
    </div>
  )
}

export default NavBar