import { useEffect, useState } from "react"
import { BsChevronDoubleDown } from "react-icons/bs"
import {  IoIosArrowRoundBack } from "react-icons/io"
import { useSelector } from "react-redux"
import { useLocation, useNavigate, useParams } from "react-router-dom"

import IconBtn from "../common/IconBtn"

export default function ViewCourseSideBar({ setReviewModal }) {
  const [activeStatus, setActiveStatus] = useState("")
  const [videoBarActive, setVideoBarActive] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { sectionId, subSectionId } = useParams()
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse)

  // console.log(totalNoOfLectures);
  
  useEffect(() => {
    ;(() => {
      if (!courseSectionData?.length) return
      const currentSectionIndx = courseSectionData?.findIndex(
        (data) => data?._id === sectionId
      )
      const currentSubSectionIndx = courseSectionData?.[
        currentSectionIndx
      ]?.subSections?.findIndex((data) => data?._id === subSectionId)
      const activeSubSectionId =
        courseSectionData[currentSectionIndx]?.subSections?.[
          currentSubSectionIndx
        ]?._id
      setActiveStatus(courseSectionData?.[currentSectionIndx]?._id)
      setVideoBarActive(activeSubSectionId)
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSectionData, courseEntireData, location.pathname])

  return (
    <>
      <div className="flex h-[calc(100vh-3.5rem)] md:w-[40%] lg:w-[30%]  flex-col border-r-[1px] border-r-gray-700 bg-gray-800">
        <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-gray-600 py-5 text-lg font-bold text-gray-25">
          <div className="flex w-full items-center justify-between ">
            <div
              onClick={() => {
                navigate(`/dashboard/enrolled-courses`)
              }}
              className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-gray-100 p-1 text-gray-700 hover:scale-90"
              title="back"
            >
              <IoIosArrowRoundBack size={30} />
            </div>
            <IconBtn
              text="Add Review"
              customClasses="ml-auto"
              onclick={() => setReviewModal(true)}
            />
          </div>
          <div className="flex flex-col">
            <p>{courseEntireData?.courseName}</p>
            <p className="text-sm font-semibold text-gray-500">
              {completedLectures?.length} / {totalNoOfLectures}
            </p>
          </div>
        </div>

        <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
          {courseSectionData.map((section, index) => (
            <div
              className="mt-2 cursor-pointer text-sm text-gray-50"
              onClick={() => setActiveStatus(section?._id)}
              key={index}
            >
              {/* Section */}
              <div className="flex flex-row justify-between bg-gray-600 px-5 py-4">
                <div className="w-[70%] font-semibold">
                  {section?.sectionName}
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[12px] font-medium">
                    Lession {section?.subSections?.length}
                  </span>
                  <span
                    className={`${
                      activeStatus === section?.sectionName
                        ? "rotate-0"
                        : "rotate-180"
                    } transition-all duration-500`}
                  >
                    <BsChevronDoubleDown />
                  </span>
                </div>
              </div>

              {/* Sub Sections */}
              {activeStatus === section?._id && (
                <div className="transition-[height] duration-500 ease-in-out">
                  {section?.subSections?.map((topic, i) => (
                    <div
                      className={`flex gap-3  px-5 py-2 ${
                        videoBarActive === topic?._id
                          ? "bg-yellow-200 font-semibold text-gray-800"
                          : "hover:bg-gray-900"
                      } `}
                      key={i}
                      onClick={() => {
                        navigate(
                          `/view-course/${courseEntireData?._id}/section/${section?._id}/sub-section/${topic?._id}`
                        )
                        setVideoBarActive(topic?._id)
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={completedLectures?.includes(topic?._id)}
                        onChange={() => {}}
                      />
                      {topic?.title}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
