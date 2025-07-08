import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const MyParcels = () => {

    const {user}= useAuth();
    const axiosSecure= useAxiosSecure()

    const {data: parcels = [], isLoading}=useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    console.log(parcels);
    

    return (
        <div>
            <h1>my parcels comming here: {parcels.length}</h1>
        </div>
    );
};

export default MyParcels;