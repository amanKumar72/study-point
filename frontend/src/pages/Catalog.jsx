import React, { useEffect, useState } from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import { Link, useParams } from "react-router-dom";
import { catagoryApi } from "../services/apis";
import CourseCard from "../components/catalog/CourseCard";
import CourseSlider from "../components/catalog/CourseSlider";

const Catalog = () => {
  const params = useParams();
  // console.log(params?.catalogName);
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  console.log(category);

  useEffect(() => {
    fetch(catagoryApi.allCategories)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          const cat = data?.categories?.find(
            (cat) =>
              cat.name.toLowerCase().split(" ").join("-") ===
              params?.catalogName.toLowerCase()
          );
          if (!cat) {
            setError("No catagory available with this tag");
            return;
          }
          setCategory(cat);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("No catagory available with this tag");
      });
  }, [params?.catalogName]);

  useEffect(() => {
    if (category) {
      fetch(catagoryApi.categoryPage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: category._id }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data?.courses?.courses);
          data.success
            ? setCourses(data?.courses?.courses)
            : setError("Some error Occured during catalog fetch");
        })
        .catch((err) => {
          console.error(err);
          setError("Some error Occured during catalog fetch");
        });
    }
  }, [category]);

  console.log(error, courses);

  if (error) {
    return (
      <div className="flex items-center flex-col min-h-screen justify-center gap-2 md:gap-4 lg:gap-6 ">
        {error || <Loader />}
        {error && (
          <Link
            to="/"
            className="text-gray-300  px-5 py-2 lg:px-10 lg:py-3 bg-gray-800 rounded-2xl  "
          >
            Go Back
          </Link>
        )}
      </div>
    );
  }

  if (!courses?.length) {
    return (
      <div className="w-full">
        <NavBar />
        <main className=" mx-auto ">
          <section className="catalogCatagory flex flex-col px-5 py-2 lg:px-20 lg:py-10 gap-2 lg:gap-7 bg-gray-800">
            <h1 className="text-2xl lg:text-4xl  font-bold">
              {category?.name || "category Name"}
            </h1>
            <h2 className="text-md md:text-lg lg:text-xl  text-gray-300 font-semibold">
              {" "}
              {category?.description || "Catagory description"}
            </h2>
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
        <section className="catalogCatagory flex flex-col px-5 py-2 lg:px-20 lg:py-10 gap-2 lg:gap-7 bg-gray-800">
          <h1 className="text-2xl lg:text-4xl  font-bold">
            {category?.name || "category Name"}
          </h1>
          <h2 className="text-md md:text-lg lg:text-xl  text-gray-300 font-semibold">
            {" "}
            {category?.description || "Catagory description"}
          </h2>
        </section>
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
