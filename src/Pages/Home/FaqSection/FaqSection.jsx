import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const FaqSection = () => {
    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);

    const faqs = [
        {
            question: 'How does this posture corrector work?',
            answer: 'A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.',
        },
        {
            question: 'Is it suitable for all ages and body types?',
            answer: 'No, it is not suitable for all ages and body types. The suitability depends on individual context such as age, body structure, and health conditions.',
        },
        {
            question: 'Does it really help with back pain and posture improvement?',
            answer: 'Yes, proper posture can reduce strain on muscles and spine, which helps reduce back pain and improves overall physical well-being.',
        },
        {
            question: 'Does it have smart features like vibration alerts?',
            answer: 'Some versions may include smart features like vibration alerts to remind you to correct posture. Check the product specs for details.',
        },
        {
            question: 'How will I be notified when the product is back in stock?',
            answer: 'You will be notified through your selected method during sign-up — email, app notifications, or SMS (if supported).',
        },
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <div className="text-center mb-10" data-aos="fade-up">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions (FAQ)</h1>
                <p className="text-gray-600">Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
            </div>

            <div className="space-y-4" data-aos="fade-up">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="collapse collapse-arrow bg-cyan-100 border border-gray-300 rounded-lg shadow-sm"
                    >
                        <input type="radio" name="faq-accordion" defaultChecked={index === 0} />
                        <div className="collapse-title text-base md:text-lg font-semibold text-gray-800">
                            {faq.question}
                        </div>
                        <div className="collapse-content text-sm text-gray-600">
                            {faq.answer}
                        </div>
                    </div>
                ))}
            </div>
            <div className='flex items-center justify-center mt-5 p-6'>
                 <button className='btn btn-primary bg-[#CAEB66] text-black border-none'>See More FAQ's</button>
            </div>
        </div>
    );
};

export default FaqSection;
