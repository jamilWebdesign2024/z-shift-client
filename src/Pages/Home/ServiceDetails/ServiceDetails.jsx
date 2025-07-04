import React from 'react';
import img1 from '../../../assets/sec/item1.png'
import img2 from '../../../assets/sec/item2.png'
import img3 from '../../../assets/sec/item3.png'

const servicesData = [
    {
        image: img1,
        title: "Live Parcel Tracking",
        description: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind."
    },
    {
        image: img2,
        title: "100% Safe Delivery",
        description: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time."
    },
    {
        image: img3,
        title: "24/7 Call Center Support",
        description: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.."
    }

];

const ServiceDetails = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10 grid gap-6">
            {servicesData.map((service, index) => (
                <div
                    key={index}
                    className="flex flex-col md:flex-row items-center bg-gray-50 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 hover:bg-[#CAEB66]"
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay={index * 200}
                >
                    <div className="w-full md:w-1/3 mb-4 md:mb-0">
                        <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-48 object-contain"
                        />
                    </div>
                    {/* Horizontal Divider for medium and above screens */}
                    <div className="hidden md:block w-px h-52 bg-gray-300 mx-4 border-l-2 border-dashed border-gray-200"></div>

                    {/* Horizontal Divider for small screens */}
                    <div className="block md:hidden w-full h-px bg-gray-300 my-4 border-l-2 border-dashed border-gray-200"></div>



                    <div className="md:pl-6 text-center md:text-left w-8/12">
                        <h3 className="text-xl font-semibold text-gray-800 mb-2">
                            {service.title}
                        </h3>
                        <p className="text-gray-600">{service.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ServiceDetails;



