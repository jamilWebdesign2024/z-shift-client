import React from 'react';
import useAuth from '../hooks/useAuth';
// import { Player } from '@lottiefiles/react-lottie-player';
// import loadRoute from '../assets/loading.json'
import { Navigate, useLocation, useNavigate } from 'react-router';

const PrivateRoutes = ({children}) => {

    const { user, loading } = useAuth();
    const location = useLocation();
    const from = location.pathname
    
   

    if (loading) {
        return <span className="loading loading-bars loading-xl"></span>
    }


    if(!user){
       return <Navigate state={{from: location.pathname}} to="/login"></Navigate>
    }



    return children;
};

export default PrivateRoutes;