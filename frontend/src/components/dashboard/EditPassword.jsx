import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { errormessage, successmessage } from "../../services/Toastify";
import { authApis } from "../../services/apis";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const EditPassword = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const [notMatched, setNotMatched] = useState(null);

  const onSubmit = (data) => {
    if (watch("newPassword") !== watch("confirmNewPassword")) {
      errormessage("new password and confirm new password do not match");
      return setNotMatched({
        message: "new password and confirm new password do not match",
      });
    } else {
      setNotMatched(null);
    }

    console.log(data);

    fetch(authApis.changePassword, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmNewPassword: data.confirmNewPassword,
      }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.success == false) {
          errormessage(
            resData.error || resData.message || "Password Not Change"
          );
          setNotMatched({
            message: resData.error || resData.message || "Password Not Change",
          });
          return;
        }
        console.log(resData);
        successmessage("Password change successfully");
        reset();
      })
      .catch(() => {
        errormessage("Password Not Change");
        setNotMatched({ message: "Password Not Change" });
      });
  };

  const handleChangeShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChangeShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
      <div className="w-full flex flex-col gap-2 md:gap-4">
        <h2 className="text-xl  mb-4 md:mb-8 lg:mb-10 md:text-2xl lg:text-4xl font-semibold text-wrap ">
          Change Password
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="inputs flex flex-col gap-2 w-full md:w-fit"
        >
          <div className="currentPassword flex flex-col gap-2">
            <label
              htmlFor="currentPassword"
              className="text-md md:text-lg lg:text-xl font-semibold text-wrap"
            >
              Current Password
            </label>
            <input
              className="bg-gray-700 px-5 py-2 text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
              type="password"
              htmlFor="currentPassword"
              name="currentPassword"
              placeholder="Enter current password"
              {...register("currentPassword", { required: true })}
            />
          </div>
          {errors.currentPassword && (
            <p role="alert" className="text-red-500 text-sm ">
              {errors.currentPassword?.message ||
                "current Password is required"}
            </p>
          )}

          <div className="passwords flex flex-col md:flex-row w-full  gap-2 ">
            <div className="password flex flex-col gap-2 ">
              <label htmlFor="password">New Password</label>
              <div className="flex relative">
                <input
                  className="bg-gray-700 px-5 italic py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                  type={showPassword ? "text" : "password"}
                  htmlFor="password"
                  name="newPassword"
                  placeholder="Enter a new password"
                  {...register("newPassword", { required: true })}
                />
                <span
                  onClick={handleChangeShowPassword}
                  className="text-gray-500 absolute cursor-pointer  right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>

            <div className="confirmPassword flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="flex relative">
                <input
                  className="bg-gray-700 italic px-5 py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                  type={showConfirmPassword ? "text" : "password"}
                  htmlFor="confirmPassword"
                  name="confirmNewPassword"
                  placeholder="Confirm New Password"
                  {...register("confirmNewPassword", { required: true })}
                />
                <span
                  onClick={handleChangeShowConfirmPassword}
                  className="text-gray-500 absolute cursor-pointer right-2 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
            </div>
          </div>
          {errors.newPassword && (
            <p role="alert" className="text-red-500 text-sm ">
              {errors.newPassword?.message || "new password is required"}
            </p>
          )}
          {errors.confirmNewPassword && (
            <p role="alert" className="text-red-500 text-sm ">
              {errors.confirmNewPassword?.message ||
                "new confirm password is required"}
            </p>
          )}
          {notMatched && (
            <p role="alert" className="text-red-500 text-sm ">
              {notMatched?.message || "confirm password is required"}
            </p>
          )}
          <button
            type="submit"
            value="Sign Up"
            className="bg-yellow-300 font-semibold text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default EditPassword;
