import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import personImg from '../../../../assets/agent-pending.png'; 
import quotes from '../../../../assets/quotes.png'; 

const testimonials = [
  {
    text: "A posture corrector works by providing support and gentle alignment to your shoulders, back, and spine, encouraging you to maintain proper posture throughout the day.",
    name: "John Doe",
    role: "Software Engineer"

  },
  {
    text: "It helps you stay upright, reduces fatigue, and minimizes back pain, ensuring better health in your daily routine.",
    name: "Jane Smith",
    role: "Designer"
  },
  {
    text: "An ideal posture corrector encourages muscle memory, so you naturally maintain a healthy stance.",
    name: "David Johnson",
    role: "Fitness Coach"
  },
  {
    text: "By aligning your spine properly, posture correctors help you breathe better and improve focus.",
    name: "Emily Davis",
    role: "Physiotherapist"
  },
  {
    text: "Gentle support from posture correctors makes long hours at a desk more comfortable.",
    name: "Michael Brown",
    role: "Product Manager"
  },
  {
    text: "Regular use of a posture corrector helps reduce chronic pain and strengthens your core.",
    name: "Sarah Wilson",
    role: "Doctor"
  }
];

const Testiomonials = () => {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={3}
        centeredSlides={true}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1
          },
          640: {
            slidesPerView: 1
          },
          1024: {
            slidesPerView: 3
          }
        }}
      >
        {testimonials.map((item, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <div
                className={`relative bg-white rounded-2xl shadow-lg p-10 mb-4 text-center transition-all duration-500 ${
                  isActive
                    ? 'scale-105 z-20'
                    : 'scale-90 opacity-50 blur-sm z-10'
                }`}
              >
               <div>
                    <img className='w-10 h-10 mb-5 filter grayscale opacity-70 text-[#C3DFE2]' src={quotes} alt="" />
               </div>

                {/* Quote text */}
                <p className="text-gray-700 mb-6 text-sm md:text-base">
                  {item.text}
                </p>

                {/* Person info */}
                <div className="flex items-center justify-center gap-3 mt-4">
                  <img
                    src={personImg}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-gray-800">{item.name}</h4>
                    <p className="text-gray-500 text-sm">{item.role}</p>
                  </div>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testiomonials;
