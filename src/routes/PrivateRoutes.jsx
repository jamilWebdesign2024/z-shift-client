import React from 'react';
import useAuth from '../hooks/useAuth';
// import { Player } from '@lottiefiles/react-lottie-player';
// import loadRoute from '../assets/loading.json'
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {

    const { user, loading } = useAuth();

    if (loading) {
        return <span className="loading loading-bars loading-xl"></span>
        // <div className="flex justify-center items-center min-h-screen">
        //     <Player
        //         autoplay
        //         loop
        //         src={loadRoute}
        //         style={{ height: '300px', width: '300px' }}
        //     />
        // </div>
    }
    if(!user){
        <Navigate to="/login"></Navigate>
    }

    return children;
};

export default PrivateRoutes;