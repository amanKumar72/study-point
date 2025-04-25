import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

import CourseCard from "./CourseCard";

function CourseSlider({ Courses }) {
  return (
    <div className="flex justify-center gap-2 lg:gap-7 p-2 lg:p-10 ">
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            490: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
          className="w-full"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide
              key={i}
              className="w-56 min-h-56 p-2 md:p-4 bg-gray-800 rounded-lg md:rounded-xl lg:rounded-2xl"
            >
              <CourseCard course={course} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className="text-xl text-gray-300">No Course Found</p>
      )}
    </div>
  );
}

export default CourseSlider;
