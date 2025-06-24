import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { courseApi } from "../services/apis";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

import { useDispatch, useSelector } from "react-redux";
import ViewCourseSideBar from "../components/viewCourse/ViewCourseSideBar";
import CourseReviewModal from "../components/viewCourse/CourseReviewModal";

const ViewCourse = () => {
  const { courseId } = useParams();
  const viewCourse = useSelector((state) => state.viewCourse);
  const [error, setError] = useState(null);
  const [reviewModal, setReviewModal] = useState(false);

  const dispatch = useDispatch();
  // console.log(courseId);

  useEffect(() => {
    fetch(courseApi.getFullCourseDetails, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ courseId }),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        if (data.success) {
          data = data.data;
          dispatch(setCompletedLectures(data?.completeedVideos));
          dispatch(setCourseSectionData(data?.courseDetails?.courseContent));
          dispatch(setEntireCourseData(data?.courseDetails));
          let lectures = 0;
          data?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSections.length;
          });
          dispatch(setTotalNoOfLectures(lectures));
          return;
        }
        setError(
          data.message || data.error || "Unable to fetch course details"
        );
      })
      .catch((err) => setError(err?.message || "Some error occurred"));
  }, [courseId]);

  // console.log(viewCourse);

  return (
    <>
      <div className="relative flex flex-col md:flex-row min-h-[calc(100vh-3.5rem)]">
        <ViewCourseSideBar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
};

export default ViewCourse;
