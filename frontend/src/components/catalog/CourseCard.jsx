import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { reviewApis } from "../../services/apis";
import RatingStars from "../common/RatingStars"

const CourseCard = ({ course }) => {
  const [avgRating, setAvgRating] = useState(0);
  // console.log(course._id);
  
  useEffect(() => {
    fetch(reviewApis.getAverageRating, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId: course?._id }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        
        if (data.success) {
          setAvgRating(data?.averageRating);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, [course]);

  return (
    <Link
      to={"/course/" + course?._id}
      className="w-60 min-h-56 p-2 md:p-4 bg-gray-800 rounded-lg md:rounded-xl lg:rounded-2xl"
    >
      <img
        src={course?.thumbnail}
        className="w-56 h-28  object-contain"
        alt=""
      />
      <h2 className="text-lg font-bold">{course?.courseName}</h2>
      <h2 className="text-md font-semibold">Price: $ {course?.price}</h2>
      <h2 className="text-md font-semibold">Language :{course?.language}</h2>
      <RatingStars Star_Size={22} Review_Count={avgRating}/>
    </Link>
  );
};

export default CourseCard;
