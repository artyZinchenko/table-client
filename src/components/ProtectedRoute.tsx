import { Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../contexts/AuthContext';
import { useEffect } from 'react';

const ProtectedRoutes = () => {
    const authContext = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authContext.isAuthenticated) {
            navigate('/authentication');
        }
    }, [authContext]);

    if (authContext.user) {
        return <Outlet />;
    }

    return null;
};

export default ProtectedRoutes;
