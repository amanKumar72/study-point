import React, { useEffect, useState } from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import Loader from "../components/common/Loader";
import { useParams } from "react-router-dom";
import { catagoryApi } from "../services/apis";
import CourseCard from "../components/catalog/CourseCard";

const Catalog = () => {
  const params = useParams();
  console.log(params?.catalogName);
  const [courses, setCourses] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch(catagoryApi.categoryPage, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ categoryId: "67e2ccde08640e7bffd8771b" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.courses.courses);

        data.success
          ? setCourses(data?.courses?.courses)
          : setError("Some error Occured");
        data?.courses?.courses.length == 0
          ? setError("No courses of this category")
          : setError(null);
      })
      .catch((err) => console.error(err));
  }, []);

  if (error || !courses) {
    return <>{error || <Loader />}</>;
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
        <section className="flex flex-wrap gap-2 lg:gap-7 p-2 lg:p-4 ">
          {courses.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Catalog;
