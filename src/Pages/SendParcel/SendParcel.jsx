// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import dayjs from 'dayjs';
// import 'react-toastify/dist/ReactToastify.css';

// const ParcelForm = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       senderName: 'John Doe',
//     },
//   });

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [cost, setCost] = useState(0);
//   const [formData, setFormData] = useState(null);

//   const calculateCost = (data) => {
//     const base = data.type === 'document' ? 50 : 100;
//     const weightCost = data.type === 'non-document' && data.weight ? data.weight * 10 : 0;
//     const serviceCenterFactor = data.receiverServiceCenter === 'remote' ? 20 : 0;
//     return base + weightCost + serviceCenterFactor;
//   };

//   const onSubmit = (data) => {
//     const totalCost = calculateCost(data);
//     setCost(totalCost);
//     setFormData(data);

//     toast.info(`Estimated Delivery Cost: $${totalCost}`, {
//       autoClose: false,
//       closeOnClick: false,
//       closeButton: false,
//       position: 'top-center',
//     });

//     setShowConfirm(true);
//   };

//   const confirmSubmission = () => {
//     if (formData) {
//       const parcel = {
//         ...formData,
//         creation_date: dayjs().toISOString(),
//       };
//       console.log('Parcel saved:', parcel);

//       toast.success('Parcel info saved!');
//       setShowConfirm(false);
//       reset();
//     }
//   };

//   const parcelType = watch('type');

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-2">Send a Parcel</h1>
//       <p className="text-gray-600 mb-6">Please fill in the details below to send your parcel.</p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         {/* Parcel Info */}
//         <div className="bg-base-200 p-4 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

//           <div className="form-control mb-3">
//             <label className="label mb-2">Type</label>
//             <div className="flex items-center gap-6">
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="document" {...register('type', { required: true })} className="radio radio-primary" />
//                 <span>Document</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="non-document" {...register('type', { required: true })} className="radio radio-primary" />
//                 <span>Non-document</span>
//               </label>
//             </div>
//             {errors.type && <span className="text-error text-sm mt-1">Type is required</span>}
//           </div>

//           <div className="form-control mb-3">
//             <label className="label">Title</label>
//             <input {...register('title', { required: true })} className="input input-bordered w-full" />
//             {errors.title && <span className="text-error text-sm">Title is required</span>}
//           </div>

//           {parcelType === 'non-document' && (
//             <div className="form-control mb-3">
//               <label className="label">Weight (kg)</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 {...register('weight')}
//                 className="input input-bordered w-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Sender & Receiver Info Side by Side on Large Devices */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Sender Info */}
//           <div className="bg-base-200 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Sender Info</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="form-control">
//                 <label className="label">Name</label>
//                 <input {...register('senderName', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control">
//                 <label className="label">Contact</label>
//                 <input {...register('senderContact', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control">
//                 <label className="label">Region</label>
//                 <input {...register('senderRegion', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control">
//                 <label className="label">Service Center</label>
//                 <select {...register('senderServiceCenter', { required: true })} className="select select-bordered w-full">
//                   <option value="">Choose Center</option>
//                   <option value="main">Main</option>
//                   <option value="remote">Remote</option>
//                 </select>
//               </div>

//               <div className="form-control md:col-span-2">
//                 <label className="label">Address</label>
//                 <input {...register('senderAddress', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control md:col-span-2">
//                 <label className="label">Pickup Instructions</label>
//                 <textarea {...register('pickupInstructions', { required: true })} className="textarea textarea-bordered w-full" />
//               </div>
//             </div>
//           </div>

//           {/* Receiver Info */}
//           <div className="bg-base-200 p-4 rounded-lg">
//             <h2 className="text-xl font-semibold mb-4">Receiver Info</h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="form-control">
//                 <label className="label">Name</label>
//                 <input {...register('receiverName', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control">
//                 <label className="label">Contact</label>
//                 <input {...register('receiverContact', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control">
//                 <label className="label">Region</label>
//                 <input {...register('receiverRegion', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control">
//                 <label className="label">Service Center</label>
//                 <select {...register('receiverServiceCenter', { required: true })} className="select select-bordered w-full">
//                   <option value="">Choose Center</option>
//                   <option value="main">Main</option>
//                   <option value="remote">Remote</option>
//                 </select>
//               </div>

//               <div className="form-control md:col-span-2">
//                 <label className="label">Address</label>
//                 <input {...register('receiverAddress', { required: true })} className="input input-bordered w-full" />
//               </div>

//               <div className="form-control md:col-span-2">
//                 <label className="label">Delivery Instructions</label>
//                 <textarea {...register('deliveryInstructions', { required: true })} className="textarea textarea-bordered w-full" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Submit */}
//         <div className="text-center">
//           <button type="submit" className="btn btn-primary">Submit</button>
//         </div>
//       </form>

//       {/* Confirm Button */}
//       {showConfirm && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-base-100 shadow-lg p-4 rounded-lg border border-base-300">
//           <p className="font-semibold mb-2">Confirm Delivery Cost: ${cost}</p>
//           <button onClick={confirmSubmission} className="btn btn-success btn-sm">Confirm</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ParcelForm;


// import React, { useState, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import { toast } from 'react-toastify';
// import dayjs from 'dayjs';
// import 'react-toastify/dist/ReactToastify.css';

// const serviceCenters = [
//   { id: 1, name: 'Main Warehouse', district: 'Dhaka', region: 'North' },
//   { id: 2, name: 'Remote Depot', district: 'Chittagong', region: 'South' },
//   { id: 3, name: 'Branch Center', district: 'Sylhet', region: 'East' },
//   { id: 4, name: 'City Hub', district: 'Khulna', region: 'West' }
// ];

// const ParcelForm = () => {
//   const {
//     register,
//     handleSubmit,
//     watch,
//     reset,
//     formState: { errors },
//   } = useForm({
//     defaultValues: {
//       senderName: 'John Doe',
//     },
//   });

//   const [showConfirm, setShowConfirm] = useState(false);
//   const [cost, setCost] = useState(0);
//   const [formData, setFormData] = useState(null);
//   const [regions, setRegions] = useState([]);

//   useEffect(() => {
//     const uniqueRegions = [...new Set(serviceCenters.map(center => center.region))];
//     setRegions(uniqueRegions);
//   }, []);

//   const calculateCost = (data) => {
//     const base = data.type === 'document' ? 50 : 100;
//     const weightCost = data.type === 'non-document' && data.weight ? data.weight * 10 : 0;
//     const serviceCenterFactor = data.receiverServiceCenter === 'remote' ? 20 : 0;
//     return base + weightCost + serviceCenterFactor;
//   };

//   const onSubmit = (data) => {
//     const totalCost = calculateCost(data);
//     setCost(totalCost);
//     setFormData(data);

//     toast.info(`Estimated Delivery Cost: $${totalCost}`, {
//       autoClose: false,
//       closeOnClick: false,
//       closeButton: false,
//       position: 'top-center',
//     });

//     setShowConfirm(true);
//   };

//   const confirmSubmission = () => {
//     if (formData) {
//       const parcel = {
//         ...formData,
//         creation_date: dayjs().toISOString(),
//       };
//       console.log('Parcel saved:', parcel);

//       toast.success('Parcel info saved!');
//       setShowConfirm(false);
//       reset();
//     }
//   };

//   const parcelType = watch('type');

//   return (
//     <div className="w-full max-w-4xl mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-2">Send a Parcel</h1>
//       <p className="text-gray-600 mb-6">Please fill in the details below to send your parcel.</p>

//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
//         {/* Parcel Info */}
//         <div className="bg-base-200 p-4 rounded-lg">
//           <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

//           <div className="form-control mb-3">
//             <label className="label mb-2">Type</label>
//             <div className="flex items-center gap-6">
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="document" {...register('type', { required: true })} className="radio radio-primary" />
//                 <span>Document</span>
//               </label>
//               <label className="flex items-center gap-2">
//                 <input type="radio" value="non-document" {...register('type', { required: true })} className="radio radio-primary" />
//                 <span>Non-document</span>
//               </label>
//             </div>
//             {errors.type && <span className="text-error text-sm mt-1">Type is required</span>}
//           </div>

//           <div className="form-control mb-3">
//             <label className="label">Title</label>
//             <input {...register('title', { required: true })} className="input input-bordered w-full" />
//             {errors.title && <span className="text-error text-sm">Title is required</span>}
//           </div>

//           {parcelType === 'non-document' && (
//             <div className="form-control mb-3">
//               <label className="label">Weight (kg)</label>
//               <input
//                 type="number"
//                 step="0.1"
//                 {...register('weight')}
//                 className="input input-bordered w-full"
//               />
//             </div>
//           )}
//         </div>

//         {/* Sender & Receiver Info */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {["sender", "receiver"].map((role) => (
//             <div key={role} className="bg-base-200 p-4 rounded-lg">
//               <h2 className="text-xl font-semibold mb-4">{role === 'sender' ? 'Sender Info' : 'Receiver Info'}</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="form-control">
//                   <label className="label">Name</label>
//                   <input {...register(`${role}Name`, { required: true })} className="input input-bordered w-full" />
//                 </div>
//                 <div className="form-control">
//                   <label className="label">Contact</label>
//                   <input {...register(`${role}Contact`, { required: true })} className="input input-bordered w-full" />
//                 </div>
//                 <div className="form-control">
//                   <label className="label">Region</label>
//                   <select {...register(`${role}Region`, { required: true })} className="select select-bordered w-full">
//                     <option value="">Choose Region</option>
//                     {regions.map(region => (
//                       <option key={region} value={region}>{region}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-control">
//                   <label className="label">Service Center</label>
//                   <select {...register(`${role}ServiceCenter`, { required: true })} className="select select-bordered w-full">
//                     <option value="">Choose Center</option>
//                     {serviceCenters.map(center => (
//                       <option key={center.id} value={center.name}>{center.name} ({center.district})</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-control md:col-span-2">
//                   <label className="label">Address</label>
//                   <input {...register(`${role}Address`, { required: true })} className="input input-bordered w-full" />
//                 </div>
//                 <div className="form-control md:col-span-2">
//                   <label className="label">{role === 'sender' ? 'Pickup' : 'Delivery'} Instructions</label>
//                   <textarea {...register(`${role === 'sender' ? 'pickupInstructions' : 'deliveryInstructions'}`, { required: true })} className="textarea textarea-bordered w-full" />
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="text-center">
//           <button type="submit" className="btn btn-primary">Submit</button>
//         </div>
//       </form>

//       {showConfirm && (
//         <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-base-100 shadow-lg p-4 rounded-lg border border-base-300">
//           <p className="font-semibold mb-2">Confirm Delivery Cost: ${cost}</p>
//           <button onClick={confirmSubmission} className="btn btn-success btn-sm">Confirm</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ParcelForm;

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import dayjs from 'dayjs';
import 'react-toastify/dist/ReactToastify.css';
import { useLoaderData } from 'react-router';

const ParcelForm = () => {
  // useForm for form handling
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      senderName: 'John Doe', // default sender name
    },
  });

  // Load service center data from route loader
  const serviceCenters = useLoaderData();

  // State declarations
  const [regions, setRegions] = useState([]);
  const [cost, setCost] = useState(0);
  const [formData, setFormData] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  // Watch values to detect changes
  const senderRegion = watch('senderRegion');
  const receiverRegion = watch('receiverRegion');
  const parcelType = watch('type');

  // Extract unique regions from service centers
  useEffect(() => {
    const uniqueRegions = [...new Set(serviceCenters.map(w => w.region))];
    setRegions(uniqueRegions);
  }, [serviceCenters]);

  // Filter centers by region
  const getCentersByRegion = (region) => {
    return serviceCenters.filter(center => center.region === region);
  };

  // Calculate delivery cost based on type, weight, and center
  const calculateCost = (data) => {
    const base = data.type === 'document' ? 50 : 100;
    const weightCost = data.type === 'non-document' && data.weight ? data.weight * 10 : 0;
    const serviceCenterFactor = data.receiverServiceCenter === 'remote' ? 20 : 0;
    return base + weightCost + serviceCenterFactor;
  };

  // Form submission handler
  const onSubmit = (data) => {
    const totalCost = calculateCost(data);
    setCost(totalCost);
    setFormData(data);

    // Show cost using toast
    toast.info(`Estimated Delivery Cost: $${totalCost}`, {
      autoClose: false,
      closeOnClick: false,
      closeButton: false,
      position: 'top-center',
    });

    setShowConfirm(true); // show confirm button
  };

  // Confirm and save the parcel
  const confirmSubmission = () => {
    if (formData) {
      const parcel = {
        ...formData,
        creation_date: dayjs().toISOString(), // timestamp
      };
      console.log('Parcel saved:', parcel);

      toast.success('Parcel info saved!');
      setShowConfirm(false);
      reset(); // reset form
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-2 text-black text-center">Send a Parcel</h1>
      <p className="text-gray-600 mb-6 text-center">Please fill in the details below to send your parcel.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info Section */}
        <div className="bg-base-200 p-4 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Parcel Info</h2>

          {/* Parcel Type (document / non-document) */}
          <div className="form-control mb-3">
            <label className="label mb-2">Type</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input type="radio" value="document" {...register('type', { required: true })} className="radio radio-primary" />
                <span>Document</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" value="non-document" {...register('type', { required: true })} className="radio radio-primary" />
                <span>Non-document</span>
              </label>
            </div>
            {errors.type && <span className="text-error text-sm mt-1">Type is required</span>}
          </div>

          {/* Parcel Name */}
          <div className="form-control mb-3">
            <label className="label">Parcel Name</label>
            <input {...register('title', { required: true })} className="input input-bordered w-full" placeholder="Describe your parcel" />
            {errors.title && <span className="text-error text-sm">Title is required</span>}
          </div>

          {/* Weight (only for non-document) */}
          {parcelType === 'non-document' && (
            <div className="form-control mb-3">
              <label className="label">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                {...register('weight')}
                className="input input-bordered w-full"
              />
            </div>
          )}
        </div>

        {/* Sender and Receiver Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {["sender", "receiver"].map((role) => (
            <div key={role} className="bg-base-200 p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">{role === 'sender' ? 'Sender Info' : 'Receiver Info'}</h2>
              <div className="grid grid-cols-1 gap-4">
                
                {/* Name */}
                <div className="form-control">
                  <label className="label">Name</label>
                  <input {...register(`${role}Name`, { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Contact */}
                <div className="form-control">
                  <label className="label">Contact</label>
                  <input {...register(`${role}Contact`, { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Region */}
                <div className="form-control">
                  <label className="label">Region</label>
                  <select {...register(`${role}Region`, { required: true })} className="select select-bordered w-full">
                    <option value="">Choose Region</option>
                    {regions.map(region => (
                      <option key={region} value={region}>{region}</option>
                    ))}
                  </select>
                </div>

                {/* Service Center filtered by selected region */}
                <div className="form-control">
                  <label className="label">Service Center</label>
                  <select {...register(`${role}ServiceCenter`, { required: true })} className="select select-bordered w-full">
                    <option value="">Choose Center</option>
                    {(role === 'sender'
                      ? getCentersByRegion(senderRegion)
                      : getCentersByRegion(receiverRegion)
                    ).map(center => (
                      <option key={center.city} value={center.city}>
                        {center.city} ({center.district})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Address */}
                <div className="form-control">
                  <label className="label">Address</label>
                  <input {...register(`${role}Address`, { required: true })} className="input input-bordered w-full" />
                </div>

                {/* Instructions */}
                <div className="form-control">
                  <label className="label">{role === 'sender' ? 'Pickup' : 'Delivery'} Instructions</label>
                  <textarea {...register(`${role === 'sender' ? 'pickupInstructions' : 'deliveryInstructions'}`, { required: true })} className="textarea textarea-bordered w-full" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Submit button */}
        <div className="text-center">
          <button type="submit" className="btn btn-primary text-black">Submit</button>
        </div>
      </form>

      {/* Confirm cost popup */}
      {showConfirm && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-base-100 shadow-lg p-4 rounded-lg border border-base-300">
          <p className="font-semibold mb-2">Confirm Delivery Cost: ${cost}</p>
          <button onClick={confirmSubmission} className="btn btn-success btn-sm">Confirm</button>
        </div>
      )}
    </div>
  );
};

export default ParcelForm;
