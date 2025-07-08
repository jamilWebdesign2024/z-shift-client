// import { useQuery } from '@tanstack/react-query';
// import React from 'react';
// import useAuth from '../../../hooks/useAuth';
// import useAxiosSecure from '../../../hooks/useAxiosSecure';

// const MyParcels = () => {

//     const {user}= useAuth();
//     const axiosSecure= useAxiosSecure()

//     const {data: parcels = []}=useQuery({
//         queryKey: ['my-parcels', user.email],
//         queryFn: async()=>{
//             const res = await axiosSecure.get(`/parcels?email=${user.email}`)
//             return res.data;
//         }
//     })

//     console.log(parcels);


//     return (
//         <div>
//             <h1>my parcels comming here: {parcels.length}</h1>
//         </div>
//     );
// };

// export default MyParcels;

import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const MyParcels = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure()

    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`)
            return res.data;
        }
    })

    console.log(parcels);

    const handleView = (id) => {
        console.log("View parcel", id);
        // You could open a modal or navigate to a detail page
    }

    const handlePay = (id) => {
        console.log("Proceed to payment for", id);
        // Implement your payment logic
    }

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "This parcel will be permanently deleted!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            try {
                const res = await axiosSecure.delete(`/parcels/${id}`);

                if (res.data?.deletedCount > 0 || res.data?.success) {
                    Swal.fire({
                        title: "Deleted!",
                        text: "Parcel has been deleted.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                    });
                    refetch(); // 🔁 Refresh parcel list
                } 
            } catch (error) {
                console.error(error);
                Swal.fire("Failed", "Something went wrong.", "error");
            }
        }
    };


    const FromatDate = (iso) => {
        return new Date(iso).toLocaleString();
    }




    return (
        <div className='overflow-x-auto shadow-md'>
            <table className='table table-zebra w-full'>
                <thead className='bg-base-200 text-base font-semibold'>
                    <tr>
                        <th>#</th>
                        <th>Title</th> {/* ✅ Title header added */}
                        <th>Type</th>
                        <th>Created At</th>
                        <th>Cost</th>
                        <th>Payment</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => {
                        return ( // ✅ You need this return
                            <tr key={parcel._id}>
                                <td>{index + 1}</td>
                                <td className='max-w-[180px] truncate'>{parcel.title}</td>
                                <td className='capitalize'>{parcel.type}</td>
                                <td>{FromatDate(parcel.creation_date)}</td>
                                <td>৳{parcel.cost}</td>
                                <td>
                                    <span className={`badge ${parcel.payment_status === "paid"
                                        ? "badge-success "
                                        : "badge-error bg-red-600 text-white"
                                        }`}>
                                        {parcel.payment_status}
                                    </span>
                                </td>
                                <td className='space-x-2'>
                                    <button
                                        onClick={() => handleView(parcel._id)}
                                        className='btn btn-xs btn-outline'
                                    >
                                        View
                                    </button>
                                    {parcel.payment_status === "unpaid" && (
                                        <button
                                            onClick={() => handlePay(parcel._id)}
                                            className='btn btn-xs btn-primary text-black'
                                        >
                                            Pay
                                        </button>
                                    )}
                                    <button
                                        onClick={() => handleDelete(parcel._id)}
                                        className='btn btn-xs btn-error'
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        );
                    })}

                    {parcels.length === 0 && (
                        <tr>
                            <td colSpan="6" className='text-center text-gray-500 py-6'>
                                No parcels found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

        </div>
    );
};

export default MyParcels;