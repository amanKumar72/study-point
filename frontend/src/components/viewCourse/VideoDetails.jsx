import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ReactPlayer from "react-player";

import { useLocation } from "react-router-dom";
import { BigPlayButton, Player } from "video-react";

// import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../slices/viewCourseSlice";
import IconBtn from "../common/IconBtn";
import { errormessage, successmessage } from "../../services/Toastify";
import { courseApi } from "../../services/apis";

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const playerRef = useRef(null);
  const dispatch = useDispatch();
  const  token  = localStorage.getItem("token");
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse);

  const [videoData, setVideoData] = useState([]);
  const [previewSource, setPreviewSource] = useState("");
  const [videoEnded, setVideoEnded] = useState(false);
  const [loading, setLoading] = useState(false);
  // console.log(videoData);

  useEffect(() => {
    (async () => {
      if (!courseSectionData?.length) return;
      if (!courseId && !sectionId && !subSectionId) {
        navigate(`/dashboard/enrolled-courses`);
      } else {
        // console.log("courseSectionData", courseSectionData)
        const sectionData = courseSectionData?.filter(
          (section) => section?._id === sectionId
        );
        // console.log("filteredData", sectionData?.[0])
        const filteredVideoData = sectionData?.[0]?.subSections?.filter(
          (subSection) => subSection?._id === subSectionId
        );
        // console.log("filteredVideoData", filteredVideoData)

        setVideoData(filteredVideoData?.[0]);
        setPreviewSource(courseEntireData?.thumbnail);
        setVideoEnded(false);
      }
    })();
  }, [courseSectionData, courseEntireData, location.pathname]);

  const markLectureAsComplete = (data) => {
    console.log(data,token);
    
    fetch(courseApi.updateCourseProgress, {
      method: "POST",
      body: JSON.stringify({
        courseId: data.courseId,
        subsectionId: data.subsectionId,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == false) {
          // setError(data.message || data.error || "Unable to login");
          errormessage(
            data.message || data.error || "Unable to update lecture completion"
          );
          return;
        }
        successmessage("lecture completed successful");
        //   navigate("/dashboard/profile");
      })
      .catch((err) => {
        //   setError(err?.message || "unable to login");
        errormessage(err?.message || "unable to update lecture completion");
      });
  };
  // check if the lecture is the first video of the course
  const isFirstVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    );

    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSections?.findIndex((data) => data?._id === subSectionId);

    if (currentSectionIndx === 0 && currentSubSectionIndx === 0) {
      return true;
    } else {
      return false;
    }
  };

  // go to the next video
  const goToNextVideo = () => {
    console.log(courseSectionData)
    
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    );
    console.log("currentSectionIndx",currentSectionIndx)

    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSections?.length;

    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSections?.findIndex((data) => data?._id === subSectionId);

    // console.log("no of subsections", noOfSubsections);

    if (currentSubSectionIndx !== noOfSubsections - 1) {
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndx]?.subSections?.[
          currentSubSectionIndx + 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      );
    } else {
      const nextSectionId = courseSectionData?.[currentSectionIndx + 1]?._id;
      const nextSubSectionId =
        courseSectionData?.[currentSectionIndx + 1]?.subSections?.[0]?._id;
      navigate(
        `/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      );
    }
  };

  // check if the lecture is the last video of the course
  const isLastVideo = () => {
    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    );

    const noOfSubsections =
      courseSectionData?.[currentSectionIndx]?.subSections?.length;

    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSections?.findIndex((data) => data?._id === subSectionId);

    if (
      currentSectionIndx === courseSectionData?.length - 1 &&
      currentSubSectionIndx === noOfSubsections - 1
    ) {
      return true;
    } else {
      return false;
    }
  };

  // go to the previous video
  const goToPrevVideo = () => {
    // console.log(courseSectionData)

    const currentSectionIndx = courseSectionData?.findIndex(
      (data) => data?._id === sectionId
    );

    const currentSubSectionIndx = courseSectionData?.[
      currentSectionIndx
    ]?.subSections?.findIndex((data) => data?._id === subSectionId);

    if (currentSubSectionIndx !== 0) {
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndx]?.subSections?.[
          currentSubSectionIndx - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      );
    } else {
      const prevSectionId = courseSectionData?.[currentSectionIndx - 1]?._id;
      const prevSubSectionLength =
        courseSectionData?.[currentSectionIndx - 1]?.subSections?.length;
      const prevSubSectionId =
        courseSectionData?.[currentSectionIndx - 1]?.subSections?.[
          prevSubSectionLength - 1
        ]?._id;
      navigate(
        `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      );
    }
  };

  const handleLectureCompletion = async () => {
    setLoading(true);
    const res = await markLectureAsComplete(
      { courseId: courseId, subsectionId: subSectionId }
    );
    if (res) {
      dispatch(updateCompletedLectures(subSectionId));
    }
    setLoading(false);
  };
  // console.log(videoEnded);
  return (
    <div className="flex flex-col gap-5 text-white">
      {!videoData ? (
        <img
          src={previewSource}
          alt="Preview"
          className="h-full w-full rounded-md object-cover"
        />
      ) : (
        <div>
          <ReactPlayer
            ref={playerRef}
            //   aspectratio="16:9"
            loop={false}
            controls
            onEnded={() => {
              // console.log("video ended");
              setVideoEnded(true);
            }}
            url={videoData?.videoUrl}
            pip={false}
            width={"full"}
            height={"90vh"}
          >
            <BigPlayButton position="center" />
            {/* Render When Video Ends */}
          </ReactPlayer>
          {videoEnded && (
            <div
              style={{
                backgroundImage:
                  "linear-gradient(to top, rgb(0, 0, 0), rgba(0,0,0,0.7), rgba(0,0,0,0.5), rgba(0,0,0,0.1)",
              }}
              className="full absolute inset-0 z-[100] grid h-full place-content-center font-inter"
            >
              {!completedLectures?.includes(subSectionId) && (
                <IconBtn
                  disabled={loading}
                  onclick={() => handleLectureCompletion()}
                  text={!loading ? "Mark As Completed" : "Loading..."}
                  customClasses="text-xl max-w-max px-4 mx-auto"
                />
              )}
              <IconBtn
                disabled={loading}
                onclick={() => {
                  // console.log(playerRef);

                  if (playerRef?.current) {
                    // set the current time of the video to 0
                    playerRef?.current?.seekTo(0);
                    setVideoEnded(false);
                  }
                }}
                text="Rewatch"
                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
              />
              <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                {!isFirstVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToPrevVideo}
                    className="blackButton bg-green-500 text-black px-5 py-2 rounded-xl"
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="blackButton  bg-green-500 text-black px-5 py-2 rounded-xl "
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}{" "}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
      <p className="pt-2 pb-6">{videoData?.description}</p>
    </div>
  );
};

export default VideoDetails;
// video
