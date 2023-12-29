
import { FC,} from 'react'
import { useAppSelector } from '../redux/hooks/hooks'
import { Navigate } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Spinner from '../spinner/Spinner'

type UserRoutersProps = {
    loading: boolean,

}
const AdminRoutes: FC<UserRoutersProps> = ({ loading }) => {
    const {  user, isAdmin } = useAppSelector(state => state.auth);

    if (loading) {
        // Muestra un indicador de carga o componente de carga mientras se verifican las credenciales
        return <div className="bg-white h-[60vh] w-full flex items-center justify-center"><Spinner /></div>;
    }

    if(!isAdmin  || !user.isAdmin ) return <Navigate to='/'/>
    return (
        <div>
            <Outlet />
        </div>
    )
}

export default AdminRoutes