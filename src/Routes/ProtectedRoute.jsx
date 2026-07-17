import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '@/Features/Auth/context/AuthContext.jsx'; 

const ProtectedRoute = ({ adminOnly = false }) => {
    const { user, token } = useContext(AuthContext);

    
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    
    if (adminOnly && user?.role !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
