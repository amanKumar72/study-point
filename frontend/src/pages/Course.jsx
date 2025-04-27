import React, { useEffect, useState } from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { Link, useParams } from "react-router-dom";
import { courseApi } from "../services/apis";
import Loader from "../components/common/Loader";
import RatingStars from "../components/common/RatingStars";

const Course = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    fetch(courseApi.getCourseDetails, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setCourse(data.data.courseDetails);
          return;
        }
        setError(
          data.message || data.error || "Unable to fetch course details"
        );
      })
      .catch((err) => setError(err?.message || "Some error occurred"));
  }, [courseId]);

  const getAvgRating = () => {
    if (!course?.ratingAndReviews?.length) return 0;
    return course.ratingAndReviews.reduce((acc, review) => acc + review.rating, 0) / course.ratingAndReviews.length;
  }

  if (error || !course) {
    return (
      <div className="flex items-center flex-col min-h-screen justify-center gap-2 md:gap-4 lg:gap-6">
        {error || <Loader />}
        {error && (
          <Link
            to="/"
            className="text-gray-300 px-5 py-2 lg:px-10 lg:py-3 bg-gray-800 rounded-2xl"
          >
            Go Back
          </Link>
        )}
      </div>
    );
  }

  return (
    <div>
      <NavBar />
      <main>
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Course Image and Basic Info */}
            <div>
              <img 
                src={course.thumbnail} 
                alt={course.courseName}
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 opacity-90" 
              />
              <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                    {course.category?.name}
                  </span>
                  <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {course.language}
                  </span>
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  ${course.price}
                </p>
              </div>
            </div>

            {/* Course Details */}
            <div className="space-y-6">
              <h1 className="text-4xl font-bold text-gray-100 leading-tight">
                {course.courseName}
              </h1>
              
              <p className="text-lg text-gray-300">
                {course.courseDescription}
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <RatingStars Review_Count={getAvgRating()} />
                  <span className="font-medium text-gray-200">{course.ratingAndReviews?.length} Reviews</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <span className="font-medium text-gray-200">{course.studentsEnrolled?.length} Students</span>
                </div>
              </div>

              <div className="border-t border-purple-200 pt-6">
                <h3 className="text-2xl font-bold text-gray-100 mb-4">What You'll Learn</h3>
                <p className="text-gray-200">{course.whatYouWillLearn}</p>
              </div>

              <div className="border-t border-purple-200 pt-6">
                <div className="flex items-center justify-between cursor-pointer" 
                     onClick={() => setShowInstructions(!showInstructions)}>
                  <h3 className="text-2xl font-bold text-gray-100">Instructions</h3>
                  <svg 
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      showInstructions ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  showInstructions ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                }`}>
                  {course.instructions?.map((instruction, i) => (
                    <div key={i} className="flex items-start gap-2 mt-4">
                      <div className="min-w-[24px] h-6 flex items-center justify-center rounded-full bg-purple-600 text-white text-sm">
                        {i + 1}
                      </div>
                      <p className="text-gray-200">{instruction}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-purple-200 pt-6">
                <h3 className="text-2xl font-bold text-gray-100 mb-4">Instructor</h3>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-md">
                    <span className="text-xl font-bold text-purple-600">
                      {course.instructor?.firstName?.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg text-gray-100">{course.instructor?.firstName}</p>
                    <p className="text-gray-300">Instructor</p>
                  </div>
                </div>
              </div>
    
    
              <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 rounded-xl font-bold text-lg hover:from-purple-700 hover:to-indigo-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg">
                Enroll Now
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Course;
