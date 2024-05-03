import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector} from '../redux/hooks/hooks';
import Spinner from '../spinner/Spinner';



const UserRouters = () => {
    
    const { isAuthenticated, isLoading, } = useAppSelector(state => state.auth);

    if ( isLoading) {
       
        return <div className="bg-white h-[60vh] w-full flex items-center justify-center"><Spinner/></div>;
    }

   
    if (!isAuthenticated ) {
        return <Navigate to="/" />;
    }
    
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default UserRouters