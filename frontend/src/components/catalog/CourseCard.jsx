import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ course }) => {
  return (
    <Link to={"/course/"+course?._id } className="w-56 min-h-56 p-2 md:p-4 bg-gray-800 rounded-lg md:rounded-xl lg:rounded-2xl">
      <img src={course?.thumbnail} className="w-56 h-28  object-contain" alt="" />
      <h2 className="text-lg font-bold">{course?.courseName}</h2>
      <h2 className="text-md font-semibold">{course?.price}</h2>
      <h2 className="text-md font-semibold">{course?.language}</h2>
    </Link>
  );
};

export default CourseCard;
