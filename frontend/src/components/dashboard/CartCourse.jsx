import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../../slices/cartSlice";
import RatingStars from "../common/RatingStars";

const CartCourse = ({ course }) => {
  const dispatch = useDispatch();
  console.log(course);

  const getAvgRating = () => {
    if (!course?.ratingAndReviews?.length) return 0;
    return (
      course.ratingAndReviews.reduce((acc, review) => acc + review.rating, 0) /
      course.ratingAndReviews.length
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-5  lg:gap-10 bg-gray-700 p-5 rounded-lg items-center w-full">
      <div className="w-1/2 md:w-1/6">
        <img
          src={course?.thumbnail}
          alt={course?.title}
          className=" object-cover"
        />
      </div>

      <div className="md:w-1/2">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold">
          {course?.courseName}
        </h2>
        <h2 className="text-md md:text-lg lg:text-xl">
          By {course?.instructor?.firstName}
        </h2>
        <h2 className="text-md md:text-lg lg:text-xl">
          {course?.catagory?.name}
        </h2>
        <h2 className="text-md md:text-lg lg:text-xl">
          Price : $ {course?.price}
        </h2>
        <h2 className="text-md md:text-lg lg:text-xl">
          Language: {course?.language}
        </h2>
        <h2 className="flex flex-row gap-2 items-center">
          <RatingStars Review_Count={getAvgRating()} />
          <span className="text-gray-300">
            {course?.ratingAndReviews?.length} ratings
          </span>
        </h2>
      </div>

      <div className="actionButttons flex flex-col gap-2 md:gap-5 justify-center w-full md:w-1/3">
        <button
          onClick={() => {
            dispatch(removeFromCart(course._id));
          }}
          className="bg-red-600 text-lg md:text-xl lg:text-2xl text-white px-2 md:px-5 py-1 md:py-2 rounded-md cursor-pointer text-center"
        >
          Remove
        </button>
        <Link
          to="/"
          className="bg-green-600 text-lg md:text-xl lg:text-2xl text-white px-2 md:px-5 py-1 md:py-2 rounded-md cursor-pointer text-center"
        >
          Buy Now
        </Link>
      </div>
    </div>
  );
};

export default CartCourse;
