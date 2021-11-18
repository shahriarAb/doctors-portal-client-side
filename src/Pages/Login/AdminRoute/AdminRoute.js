import { CircularProgress } from '@mui/material';
import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';

const AdminRoute = ({ children, ...rest }) => {
    const { user, isLoading, admin } = useAuth();
    const location = useLocation();

    if (isLoading) {
        return <CircularProgress color="info" />
    }
    if (user.email && admin) {
        return children;
    }
    return <Navigate to="/" state={{ from: location }} />;
};

export default AdminRoute;