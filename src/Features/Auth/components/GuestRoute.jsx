import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 

const GuestRoute = () => {
    const { token } = useContext(AuthContext);

    
    return token ? <Navigate to="/" replace /> : <Outlet />;
};

export default GuestRoute;