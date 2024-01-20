import { Outlet, Navigate } from 'react-router-dom';
import { useAppSelector} from '../redux/hooks/hooks';
import { FC} from 'react';
import Spinner from '../spinner/Spinner';

type UserRoutersProps = {
    loading: boolean,

}

const UserRouters: FC<UserRoutersProps> = () => {
    
    const { isAuthenticated, isLoading, } = useAppSelector(state => state.auth);

    if ( isLoading) {
        // Muestra un indicador de carga o componente de carga mientras se verifican las credenciales
        return <div className="bg-white h-[60vh] w-full flex items-center justify-center"><Spinner/></div>;
    }

    //console.log(isAuthenticated)
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