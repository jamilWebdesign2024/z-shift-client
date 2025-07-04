import React from 'react';
import Banner from '../Banner/Banner';
import Services from './Services/Services';
import ClientLogos from './ClientLogos/ClientLogos';
import ServiceDetails from '../ServiceDetails/ServiceDetails';
import BeMarcent from './BeMarcent/BeMarcent';
import HowItWorks from '../HowItWorks/HowItWorks';
import CustomerChoose from './CustomerChoose/CustomerChoose';
import Testiomonials from './Testiomonials/Testiomonials';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <HowItWorks></HowItWorks>
            <Services></Services>
            <ClientLogos></ClientLogos>
            <ServiceDetails></ServiceDetails>
            <BeMarcent></BeMarcent>
            <CustomerChoose></CustomerChoose>
            <Testiomonials></Testiomonials>
        </div>
    );
};

export default Home;