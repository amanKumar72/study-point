import React from 'react'
import {useSelector} from "react-redux"

const EnrolledCourses = () => {
  const {cart}=useSelector(state=>state.cart)
  return (
    <div className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">Enrolled Courses</h1>
      <section>
        <h2>{cart?.length} courses in cart</h2>
      </section>
    </div>
  )
}

export default EnrolledCourses
