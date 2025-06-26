import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CourseStatistics from "../../components/dashboard/CourseStatistics";
import CourseCard from "../../components/catalog/CourseCard";

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  return (
    <main className="flex flex-col px-2  py-2 md:px-10 md:py-5 gap-4">
      <div className="">
        <h1 className="text-xl md:text-3xl font-bold text-center md:text-start ">
          Hi {user?.firstName} 👋
        </h1>
        <h2 className="text-lg md:text-xl font-semibold text-center md:text-start text-gray-300">
          Let's start somethiong new
        </h2>
      </div>
      <div className="flex flex-col gap-4">
        <CourseStatistics courses={user.courses} />
        <div className="flex flex-col gap-5 bg-gray-900 px-4 py-2 md:px-8 md:my-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-semibold text-center md:text-start">
            Your courses
          </h2>
          <div className="flex flex-col md:flex-row gap-5">
            {user.courses.map((course, index) => (
              <CourseCard course={course} key={index} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default InstructorDashboard;
