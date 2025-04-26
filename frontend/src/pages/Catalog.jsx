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
  const [categoryId, setCategoryId] = useState(null);

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
          setCategoryId(cat._id);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("No catagory available with this tag");
      });
  }, [params?.catalogName]);

  useEffect(() => {
    if (categoryId) {
      fetch(catagoryApi.categoryPage, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categoryId: categoryId }),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data?.courses?.courses);
          data.success
            ? setCourses(data?.courses?.courses)
            : setError("Some error Occured during catalog fetch");
          data?.courses?.courses.length == 0
            ? setError("No courses of this category")
            : setError(null);
        })
        .catch((err) => {
          console.error(err);
          setError("Some error Occured during catalog fetch");
        });
    }
  }, [categoryId]);

  if (error || !courses) {
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
  return (
    <div className="w-full">
      <NavBar />
      <main className=" mx-auto ">
        <section className="catalogCatagory flex flex-col px-5 py-2 lg:px-20 lg:py-10 gap-2 lg:gap-7 bg-gray-800">
          <h1 className="text-2xl lg:text-4xl  font-bold">
            {courses?.name || "category Name"}
          </h1>
          <h2 className="text-md md:text-lg lg:text-xl  text-gray-300 font-semibold">
            {" "}
            {courses?.description || "Catagory description"}
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
        <h1 className="px-5 py-2 lg:px-20 lg:py-10 text-2xl lg:text-4xl font-bold">Top Courses</h1>


        <CourseSlider Courses={courses} />
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
