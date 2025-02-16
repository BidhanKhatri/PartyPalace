import React from "react";
import { useSelector } from "react-redux";
import Banner1 from "../assets/images/banner1.jpg";
import Banner2 from "../assets/images/banner2.jpg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const HeroSection = () => {
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={50}
      slidesPerView={1}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      className="min-h-[calc(80vh-64px)] bg-neutral-100 relative  "
    >
      <SwiperSlide>
        <div className="h-44 min-h-[calc(80vh-64px)]">
          <img
            src={Banner1}
            alt="img1"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="h-44 min-h-[calc(80vh-64px)]">
          <img
            src={Banner2}
            alt="img2"
            className="h-full w-full object-cover"
            style={{ filter: "brightness(70%)" }}
          />
        </div>
      </SwiperSlide>
      <div className=" text-neutral-200 absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <p className="text-5xl font-bold text-center">
          Easy Booking, Find Faster
        </p>
        <p className="text-xl text-center mt-2">Easy Booking, Find Faster</p>
      </div>
    </Swiper>
  );
};

export default HeroSection;
