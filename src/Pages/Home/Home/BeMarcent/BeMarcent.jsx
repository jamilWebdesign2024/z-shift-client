import React from 'react';
import locationMar from '../../../../assets/locationMarchent.png'
// import beAmerchent from '../../../../assets/be-a-merchant-bg.png'

const BeMarcent = () => {
    return (
        <div className="bg-[url('assets/be-a-merchant-bg.png')] bg-no-repeat bg-[#03373D] p-20 max-w-6xl mx-auto rounded-4xl"
            data-aos="zoom-in-up"
            data-aos-duration="1000"
            data-aos-delay={200}
        >

            <div className="hero-content flex-col sm:items-center sm:justify-center lg:flex-row-reverse">
                <img
                    src={locationMar}
                    className="max-w-sm rounded-lg shadow-2xl"
                />
                <div>
                    <h1 className="lg:text-5xl text-2xl font-bold text-white">Merchant and Customer Satisfaction is Our First Priority</h1>
                    <p className="py-6 text-white">
                        <small> We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time..</small>
                    </p>
                    <div className='flex flex-wrap gap-4'>
                        <button className="px-6 py-2 bg-[#CAEB66] text-black rounded-3xl transition">Become a Merchant</button>
                        <button className="px-6 py-2 text-[#CAEB66] border-1 border-[#CAEB66] rounded-3xl hover:bg-[#CAEB66] hover:text-black transition">Earn with Profast Couriar</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BeMarcent;