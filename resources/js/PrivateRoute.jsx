import React from 'react';
import { Inertia } from '@inertiajs/inertia';
import { useAuth } from './AuthContext';

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        Inertia.visit('/login-page');
        return null;
    }

    return children;
};

export default PrivateRoute;