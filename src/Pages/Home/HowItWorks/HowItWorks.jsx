import React from 'react';
import img1 from '../../../assets/icons/item1.png'
import img2 from '../../../assets/icons/item2.png'
import img3 from '../../../assets/icons/item3.png'
import img4 from '../../../assets/icons/item4.png'


const servicesData = [
    {
        image: img1,
        title: "Booking Pick & Drop",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        image: img2,
        title: "Cash On Delivery",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        image: img3,
        title: "Delivery Hub",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },
    {
        image: img4,
        title: "Booking SME & Corporate",
        description: "From personal packages to business shipments — we deliver on time, every time.",
    },

];


const HowItWorks = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-8" data-aos="fade-down">
                How it Works
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {servicesData.map((service, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg hover:bg-[#f9f9f9] transition"
                        data-aos="zoom-in"
                        data-aos-duration="800"
                        data-aos-delay={index * 200}
                    >
                        <img src={service.image} alt={service.title} className="w-20 h-20 mx-auto mb-4 object-contain" />
                        <h3 className="text-lg font-semibold mb-2 text-primary">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HowItWorks;


