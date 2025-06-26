import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
// import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { fetchInstructorCourses } from "../../services/operations/courseDetailsAPI"
import IconBtn from "../../components/common/IconBtn"
import CoursesTable from "../../components/dashboard/InstructorCourses/CoursesTable"

export default function MyCourse() {
  const token=localStorage.getItem("token")
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="px-4 py-2 md:px-8 md:py-4">
      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-md text-gray-50">My Courses</h1>
        <IconBtn
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconBtn>
      </div>
      {courses && <CoursesTable courses={courses} setCourses={setCourses} />}
    </div>
  )
}
