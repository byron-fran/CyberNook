import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector} from '../redux/hooks/hooks';
import { FC} from 'react';
import Spinner from '../spinner/Spinner';

type UserRoutersProps = {
    loading: boolean,

}

const UserRouters: FC<UserRoutersProps> = ({ loading }) => {

    const { isAuthenticated } = useAppSelector(state => state.auth);

    if (loading) {
        // Muestra un indicador de carga o componente de carga mientras se verifican las credenciales
        return <div className="bg-white h-[60vh] w-full flex items-center justify-center"><Spinner/></div>;
    }

    if (!isAuthenticated) {
        return <Navigate to="/" />;
    }

    return (
        <div>
            <Outlet />
        </div>
    )
}

export default UserRouters