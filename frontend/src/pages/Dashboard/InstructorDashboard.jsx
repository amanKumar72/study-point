import React from "react";
import { useSelector } from "react-redux";
import {useNavigate} from "react-router-dom"
import CourseStatistics from "../../components/dashboard/CourseStatistics";

const InstructorDashboard = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  return (
    <div className="flex flex-col px-2  py-2 md:px-10 md:py-5">
      <h1 className="text-xl md:text-3xl font-bold text-center md:text-start ">
        Hi {user?.firstName} 👋
      </h1>
      <CourseStatistics courses={user.courses} />
    </div>
  );
};

export default InstructorDashboard;
