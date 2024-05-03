
import { useAppSelector } from '../redux/hooks/hooks'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Spinner from '../spinner/Spinner'


const AdminRoutes = () => {
    
    const { user, isAdmin , isLoading} = useAppSelector(state => state.auth);

    if ( isLoading) {
       
        return <div className="bg-white h-[60vh] w-full flex items-center justify-center"><Spinner /></div>;
    }

    if (!isAdmin || !user?.isAdmin) return <Navigate to='/' />
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminRoutes