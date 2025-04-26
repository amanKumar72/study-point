import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

import { Autoplay, FreeMode, Pagination,Navigation } from "swiper/modules";

import CourseCard from "./CourseCard";

function CourseSlider({ Courses }) {
  return (
    <div className="">
      {Courses?.length ? (
        <Swiper
        navigation={true}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          760: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          1000: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
          1440: {
            slidesPerView: 4,
            spaceBetween: 15,
          },
        }}
          spaceBetween={10}
          loop={true}
          freeMode={true}
          pagination={{
            clickable:true
          }}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay,Navigation]}
          className="!p-5  md:p-10"
        >
          {Courses?.map((course, index) => {
            return (
              <SwiperSlide key={index} className="bg-gray-800 p-3 rounded-2xl">
                <CourseCard course={course} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      ) : (
        <p className="text-xl text-gray-300">No Course Found</p>
      )}
    </div>
  );
}

export default CourseSlider;
