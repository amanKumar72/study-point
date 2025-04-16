import React,{useState,useEffect} from 'react'
import { reviewApis } from "../../services/apis";
import ReviewCard from "../Home/ReviewCard";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
const Reviews = () => {
    const [reviews, setReviews] = useState(null);
  useEffect(() => {
    fetch(reviewApis.getReviews)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data?.ratings);
      })
      .catch((err) => console.log("err", err));
  }, []);
  return (
    <section className="review flex flex-col items-center gap-5 md:gap-10 lg:gap-15  ">
        <h1 className=" text-3xl md:text-5xl text-center ">
          Reviews from learners
        </h1>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween:10
            },
            830: {
              slidesPerView: 3,
              spaceBetween:10
            },
            1100: {
              slidesPerView: 4,
              spaceBetween:10
            },
            1440: {
              slidesPerView: 5,
              spaceBetween:15
            },
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews?.map((review, index) => {
            return (
              <SwiperSlide key={index} >
                <ReviewCard review={review} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
  )
}

export default Reviews
