import React from 'react';

const ServiceCard = ({ service }) => {
  
  const {title, description, icon }=service


  return (
    <div className="card bg-white shadow-lg text-gray-100 hover:bg-[#CAEB66] hover:transition-all hover:duration-300   hover:shadow-xl transition-shadow duration-300">
      <div className="card-body items-center text-center">
        <div className="mb-3">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
