import React from 'react';
import cus from '../../../../assets/customer-top.png'

const CustomerChoose = () => {
    return (
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
            <img
                src={cus}
                alt="Customer"
                className="w-32 md:w-48 mx-auto mb-6 object-contain"
            />
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-4">
                What Our Customers Are Saying
            </h1>
            <p className="text-gray-400 md:text-lg">
                Enhance posture, mobility, and well-being effortlessly with Posture Pro.
                Achieve proper alignment, reduce pain, and strengthen your body with ease!
            </p>
        </div>
    );
};

export default CustomerChoose;