import React, { useEffect, useState } from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import { Link } from "react-router-dom";
import { getAllCourses } from "../services/operations/courseDetailsAPI";
import CourseCard from "../components/catalog/CourseCard";
import CourseSlider from "../components/catalog/CourseSlider";

const Catalog = () => {
  // console.log(params?.catalogName);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getCourses = async () => {
      setLoading(true);
      const result = await getAllCourses();
      console.log("categories", result)
      if (result.length > 0) {
        setCourses(result);
      }
      setLoading(false);
    };
    getCourses();
  }, []);

//   console.log(courses);

  if (loading) {
    return (
      <div className="flex items-center flex-col min-h-screen justify-center gap-2 md:gap-4 lg:gap-6 ">
        <Loader />
      </div>
    );
  }

  if (!courses?.length) {
    return (
      <div className="w-full">
        <NavBar />
        <main className=" mx-auto ">
          <section className="catalogCatagory flex flex-col px-5 py-2 lg:px-20 lg:py-10 gap-2 lg:gap-7 bg-gray-800">
            <h1 className="text-2xl lg:text-4xl  font-bold">All Courses</h1>
          </section>
          <div className="flex items-center flex-col min-h-[50vh] justify-center gap-2 md:gap-4 lg:gap-6">
            <h1 className="px-5 py-2 lg:px-20 lg:py-10 text-2xl lg:text-4xl font-bold">
              No courses available
            </h1>
            <Link
              to="/courses"
              className="text-gray-300  px-5 py-2 lg:px-10 lg:py-3 bg-gray-800 rounded-2xl  "
            >
              Go Back
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="w-full">
      <NavBar />
      <main className=" mx-auto ">
        <h1 className="px-5 py-2 lg:px-20 lg:py-10 text-2xl lg:text-4xl font-bold">
          All Courses
        </h1>
        <section className="flex flex-wrap justify-center gap-2 lg:gap-7 p-2 lg:p-4 ">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </section>
        <h1 className="px-5 py-2 lg:px-20 lg:py-10 text-2xl lg:text-4xl font-bold">
          Top Courses
        </h1>
        <CourseSlider Courses={courses} />
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
