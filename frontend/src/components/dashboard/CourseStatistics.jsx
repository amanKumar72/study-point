import React, { useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const generateRandomColors = (numColors) => {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(
      Math.random() * 256
    )}, ${Math.floor(Math.random() * 256)})`;
    colors.push(color);
  }
  return colors;
};

const CourseStatistics = ({ courses }) => {
  const dataForStudentChart = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "No of Students ",
        data: courses.map((course) => course.studentsEnrolled.length),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };
  const dataForIncomeChart = {
    labels: courses.map((course) => course.courseName),
    datasets: [
      {
        label: "Income generated ",
        data: courses.map(
          (course) => course.studentsEnrolled.length * course.price
        ),
        backgroundColor: generateRandomColors(courses.length),
      },
    ],
  };

  const [isStudentSelected, setIsStudentSelected] = useState(true);

  return (
    <div className="flex  flex-col md:flex-row gap-5">
      <div className="w-[100%] md:w-[60%] flex flex-col gap-5 bg-gray-900 py-2 md:px-8 md:py-4 rounded-lg">
        <h1 className="text-lg md:text-2xl font-semibold text-center">
          Visualization
        </h1>
        <div className="flex gap-5 md:gap-5 justify-center">
          <button
            onClick={() => setIsStudentSelected(true)}
            className={`text-yellow-300 px-2 py-1  rounded-lg ${
              isStudentSelected ? "bg-gray-600" : ""
            }`}
          >
            Students
          </button>
          <button
            onClick={() => {
              setIsStudentSelected(false);
            }}
            className={`text-yellow-300 px-2 py-1 rounded-lg  ${
              !isStudentSelected ? "bg-gray-600" : ""
            }`}
          >
            Income
          </button>
        </div>
        <div className="max-h-100 flex justify-center">
          <Pie data={isStudentSelected?dataForStudentChart:dataForIncomeChart} />
        </div>
      </div>
      <div className="w-[100%] md:w-[40%] flex flex-col gap-5 bg-gray-900 py-2 md:px-8 md:py-4 rounded-lg text-center">
        <h1 className="text-lg md:text-2xl font-semibold ">
          Statistics
        </h1>
        <h3 className="text-lg lg:text-xl text-gray-300 font-semibold  ">
          Total Students :
        </h3>
        <h3 className="text-3xl lg:text-4xl text-white font-bold ">
          {courses.reduce(
            (acc, course) => course.studentsEnrolled.length + acc,
            0
          )}
        </h3>
        <h3 className="text-lg lg:text-2xl text-gray-300 font-semibold  ">
          Total Courses :
        </h3>
        <h3 className="text-3xl lg:text-4xl text-white font-bold ">
          {courses.length}
        </h3>
        <h3 className="text-lg lg:text-2xl text-gray-300 font-semibold  ">
          Total Income :
        </h3>
        <h3 className="text-3xl lg:text-4xl text-white font-bold ">
          Rs.
          {courses.reduce(
            (acc, course) =>
              course.studentsEnrolled.length * course.price + acc,
            0
          )}
        </h3>
      </div>
    </div>
  );
};

export default CourseStatistics;
