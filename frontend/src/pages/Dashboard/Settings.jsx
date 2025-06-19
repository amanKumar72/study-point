import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../../components/common/Loader";
import countryCodes from "../../data/countrycode.json";
import {
  errormessage,
  loadingmessage,
  successmessage,
  updatemessage,
} from "../../services/Toastify";
import { authApis, profileApi } from "../../services/apis";
import { setUser } from "../../slices/profileSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Settings = () => {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState(null);
  const {
    register,
    handleSubmit,
    watch,
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

  const handleUpdatePicture = (data) => {
    const file = data.displayPicture?.[0];
    if (!file) {
      errormessage("Please select a file");
      return;
    }
    const formData = new FormData();
    formData.append("displayPicture", file);

    const toastId = loadingmessage("Updating profile picture...");

    fetch(profileApi.updateDisplayPicture, {
      method: "PUT",
      body: formData,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success == false) {
          errormessage(toastId, "error", res?.message);
          return;
        }
        updatemessage(toastId, "success", "Upload successful");
        dispatch(setUser(res?.data));
      })
      .catch((err) => {
        errormessage(toastId, "error", "Upload failed. Please try again.");
        console.log(err.message);
      });
  };

  const handleUpdateDetails = (formData) => {
    const toastId = loadingmessage("Updating profile picture...");

    fetch(profileApi.updateProfile, {
      method: "put",
      body: JSON.stringify(formData),
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res?.success == false) {
          errormessage(toastId, "error", res?.message);
          return;
        }
        updatemessage(toastId, "success", "Upload successful");
        dispatch(setUser(res?.data));
      })
      .catch((err) => {
        updatemessage(toastId, "error", "Upload failed. Please try again.");
        console.log(err.message);
      });
  };

  if (!user) {
    return (
      <div className="flex items-center flex-col min-h-screen justify-center gap-2 md:gap-4 lg:gap-6 ">
        <Loader />
      </div>
    );
  }
  return (
    <div className="px-2 py-1 md:px-4 md:py-2 lg:px-6 lg:py-3">
      <h1 className="text-xl md:text-2xl lg:text-4xl font-bold">
        Edit profile
      </h1>

      <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
        <img
          src={user?.image}
          alt="Profile"
          className="rounded-full w-8 h-8 md:w-16 md:h-16 lg:w-20 lg:h-20"
        />

        <div>
          <h1 className="text-md md:text-lg lg:text-xl font-semibold mb-5">
            Update profile picture
          </h1>

          <form
            className="flex gap-4 md:items-center"
            onSubmit={handleSubmit(handleUpdatePicture)}
          >
            <label
              htmlFor="image"
              className="bg-gray-700 font-semibold px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg md:text-lg lg:text-xl cursor-pointer"
            >
              Select
            </label>
            <input
              {...register("displayPicture")}
              type="file"
              name="displayPicture"
              id="image"
              className="hidden"
              accept="image/*"
            />
            <input
              type="submit"
              value="Upload"
              className="bg-yellow-300 cursor-pointer w-full md:w-fit justify-center flex gap-2 items-center text-black px-4 py-2 md:px-6 md:py-3 lg:px-8 md:text-lg lg:text-xl rounded-lg"
            />
          </form>
        </div>
      </section>

      <section className="flex gap-2 my-10 bg-gray-800 p-2 md:p-5 lg:p-10 rounded-lg">
        <div className="w-full flex flex-col gap-2 md:gap-4">
          <h2 className="text-xl  mb-4 md:mb-8 lg:mb-10 md:text-2xl lg:text-4xl font-semibold text-wrap ">
            Edit Personal Details
          </h2>
          <form
            onSubmit={handleSubmit(handleUpdateDetails)}
            className="flex flex-col gap-2 md:gap-4"
          >
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="firstName"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  First Name
                </label>
                <input
                  {...register("firstName", { required: true })}
                  type="text"
                  name="firstName"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.firstName || ""}
                  placeholder="Enter First Name"
                  id="firstName"
                />
                {errors.firstName && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.firstName?.message || "firstName is required"}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="lastName"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  last Name
                </label>
                <input
                  {...register("lastName", { required: true })}
                  name="lastName"
                  type="text"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.lastName || ""}
                  placeholder="Enter Last Name"
                  id="lastName"
                />
                {errors.lastName && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.lastname?.message || "lastname is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:gap-4">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="gender"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  gender
                </label>
                <select
                  {...register("gender", { required: true })}
                  type="text"
                  name="gender"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  id="gender"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                {errors.gender && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.gender?.message || "gender is required"}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="dateOfBirth"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  Date of Birth
                </label>
                <input
                  {...register("dateOfBirth", { required: true })}
                  name="dateOfBirth"
                  type="date"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.additionalDetails?.dateOfBirth || ""}
                  placeholder="DD/MM/YYYY"
                  id="dateOfBirth"
                />
                {errors.dateOfBirth && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.dateOfBirth?.message || "date of birth is required"}
                  </p>
                )}
              </div>
            </div>
            <div className=" flex flex-col md:flex-row gap-2 md:gap-4 ">
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="about"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  About
                </label>
                <input
                  {...register("about", { required: true })}
                  type="text"
                  name="about"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.additionalDetails?.about || ""}
                  placeholder="write something about you"
                  id="about"
                />
                {errors.about && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.about?.message || "About is required"}
                  </p>
                )}
              </div>
              <div className="w-full flex flex-col gap-2">
                <label
                  htmlFor="address"
                  className="text-md md:text-lg lg:text-xl font-semibold text-wrap "
                >
                  Address
                </label>
                <input
                  {...register("address", { required: true })}
                  name="address"
                  type="text"
                  className="text-md md:text-lg break-all lg:text-xl italic text-gray-300 bg-gray-700 px-4 py-2 md:px-6 md:py-3 lg:px-8 rounded-lg"
                  defaultValue={user?.additionalDetails?.address || ""}
                  placeholder="Enter Address"
                  id="address"
                />
                {errors.address && (
                  <p role="alert" className="text-red-500 text-sm ">
                    {errors.address?.message || "address is required"}
                  </p>
                )}
              </div>
            </div>
            <div className="phone md:w-[70%] xl:w-[60%] flex flex-col gap-2">
              <label htmlFor="phone">Phone Number</label>
              <div className="flex gap-2">
                <select
                  {...register("countryCode")}
                  className="bg-gray-700 px-1 md:px-2 lg:px-4  py-2 text-md md:text-lg lg:text-2xl w-[45%] md:w-[30%]  rounded-lg text-gray-200"
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.code} - {country.name}
                    </option>
                  ))}
                </select>
                <input
                  defaultValue={user?.additionalDetails?.contactNumber || ""}
                  className="bg-gray-700 px-5 py-2 text-md md:text-lg lg:text-2xl  w-full rounded-lg text-gray-200"
                  type="number"
                  name="contactNumber"
                  placeholder="Enter Phone Number"
                  {...register("contactNumber", { required: true })}
                />
              </div>
              {errors.contactNumber && (
                <p role="alert" className="text-red-500 text-sm ">
                  {errors.contactNumber?.message ||
                    "contact number is required"}
                </p>
              )}
            </div>
            <div className="flex gap-2 md:gap-4 mt-4 md:mt-8">
              <input
                type="submit"
                className="bg-yellow-300 cursor-pointer font-semibold w-full md:w-fit justify-center flex gap-2 items-center text-black px-4 py-2 md:px-6 md:py-3 lg:px-8 md:text-lg lg:text-xl rounded-lg"
                value="Save"
              />
              <input
                type="reset"
                value="Cancel"
                className="bg-gray-700 cursor-pointer font-semibold w-full md:w-fit justify-center flex gap-2 items-center text-gray-300 px-4 py-2 md:px-6 md:py-3 lg:px-8 md:text-lg lg:text-xl rounded-lg"
              />
            </div>
          </form>
        </div>
      </section>

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
              className="bg-yellow-300 text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
            >
              Update
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Settings;
