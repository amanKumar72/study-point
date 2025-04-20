import React from "react";

const CourseCard = ({ course }) => {
  return (
    <div className="w-56 h-56 p-2 md:p-4">
      <img src={course?.thumbnail} className="w-56 h-28 object-contain" alt="" />
      <h2 className="text-lg font-bold">{course?.courseName}</h2>
      <h2 className="text-md font-semibold">{course?.price}</h2>
      <h2 className="text-md font-semibold">{course?.language}</h2>
    </div>
  );
};

export default CourseCard;
