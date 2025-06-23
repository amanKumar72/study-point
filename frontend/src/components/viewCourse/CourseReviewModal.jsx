import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {  RxCrosshair2 } from "react-icons/rx";
import ReactStars from "react-rating-stars-component";
import { useSelector } from "react-redux";

import { reviewApis } from "../../services/apis";
import IconBtn from "../common/IconBtn";
import { errormessage, successmessage } from "../../services/Toastify";

export default function CourseReviewModal({ setReviewModal }) {
  const { user } = useSelector((state) => state.profile);
  const token = localStorage.getItem("token");
  const { courseEntireData } = useSelector((state) => state.viewCourse);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    setValue("courseExperience", "");
    setValue("courseRating", 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ratingChanged = (newRating) => {
    // console.log(newRating)
    setValue("courseRating", newRating);
  };

  const onSubmit = async (data) => {
    fetch(reviewApis.createRating, {
      method: "POST",
      body: JSON.stringify({
        courseId: courseEntireData._id,
        rating: data.courseRating,
        review: data.courseExperience,
      }),
      headers: {
        "Content-Type": "application/json",
         Authorization: `Bearer ${token}`
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == false) {
          // setError(data.message || data.error || "Unable to login");
          errormessage(data.message || data.error || "Unable to add review");
          return;
        }
        successmessage("review added successful");
        //   navigate("/dashboard/profile");
      })
      .catch((err) => {
        //   setError(err?.message || "unable to login");
        errormessage(err?.message || "unable to login");
      });
  };

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid h-screen w-screen place-items-center overflow-auto bg-transparent bg-opacity-10 backdrop-blur-sm">
      <div className="my-10 w-11/12 max-w-[700px] rounded-lg border border-gray-400 bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-center justify-between rounded-t-lg bg-gray-700 p-5">
          <p className="text-xl font-semibold text-gray-50">Add Review</p>
          <button onClick={() => setReviewModal(false)}>
            <RxCrosshair2 className="text-2xl text-gray-50" />
          </button>
        </div>
        {/* Modal Body */}
        <div className="p-6">
          <div className="flex items-center justify-center gap-x-4">
            <img
              src={user?.image}
              alt={user?.firstName + "profile"}
              className="aspect-square w-[50px] rounded-full object-cover"
            />
            <div className="">
              <p className="font-semibold text-gray-50">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-sm text-gray-50">Posting Publicly</p>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-6 flex flex-col items-center"
          >
            <ReactStars
              count={5}
              onChange={ratingChanged}
              size={24}
              activeColor="#ffd700"
            />
            <div className="flex w-11/12 flex-col space-y-2">
              <label
                className="text-sm text-gray-50"
                htmlFor="courseExperience"
              >
                Add Your Experience <sup className="text-pink-200">*</sup>
              </label>
              <textarea
                id="courseExperience"
                placeholder="Add Your Experience"
                {...register("courseExperience", { required: true })}
                className="form-style resize-x-none border px-5 py-2 min-h-[130px] w-full"
              />
              {errors.courseExperience && (
                <span className="ml-2 text-xs tracking-wide text-pink-200">
                  Please Add Your Experience
                </span>
              )}
            </div>
            <div className="mt-6 flex w-11/12 justify-end gap-x-2">
              <button
                onClick={() => setReviewModal(false)}
                className={`flex cursor-pointer items-center gap-x-2 rounded-md bg-gray-300 py-[8px] px-[20px] font-semibold text-gray-900`}
              >
                Cancel
              </button>
              <IconBtn text="Save" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
