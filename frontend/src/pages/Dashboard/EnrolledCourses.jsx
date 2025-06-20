import React from 'react'
import { useSelector } from 'react-redux';
import EnrolledCourseCard from '../../components/dashboard/EnrolledCourseCard';

const EnrolledCourses = () => {
  const {user} = useSelector((state) => state.profile);
  return (
    <div className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Enrolled Courses</h1>
      <section className="mx-10 my-5">
        <h2 className="text-gray-300 text-lg md:text-xl lg:text-3xl font-semibold">
          {user?.courses?.length} enrolled courses
        </h2>
      </section>
      <div className="flex flex-col gap-5 lg:gap-10">
      {user?.courses?.map((course)=>(
        <div key={course._id}>
          <EnrolledCourseCard course={course} />
        </div>
      ))}
      </div>
    </div>
  )
}

export default EnrolledCourses
