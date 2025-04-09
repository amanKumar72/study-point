import React, { useState } from "react";
import signup from "../assets/Images/signup.webp";
import HighLighedText from "../components/Home/HighLighedText";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const SignUp = () => {
  const [currentAccountType, setCurrentAccountType] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChangeShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleChangeShowConfirmPassword = (e) => {
    e.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <section className="flex flex-col md:flex-row gap-10 items-center w-full p-5 md:p-10 lg:p-15">
      <div className="form flex flex-col gap-5 md:w-[70%]">
        <div className="texts flex flex-col gap-4 ">
          <h1 className=" text-xl md:text-2xl lg:text-4xl text-bold ">
            Join the millions learning to code with StudyNotion for free
          </h1>
          <h2 className=" text-md md:text-lg lg:text-xl text-semibold text-gray-300">
            Build skills for today, tomorrow, and beyond.
          </h2>
          <h3 className="text-md md:text-lg lg:text-xl italic">
            <HighLighedText text=" Education to future-proof your career." />
          </h3>
        </div>
        <div className="signupAsA flex gap-2 bg-gray-800 text-lg  rounded-full  px-4 py-2 w-fit ">
          <p
            className={`${
              currentAccountType == "Student" ? " bg-black" : ""
            } rounded-full px-5 py-2`}
            onClick={() => {
              setCurrentAccountType("Student");
            }}
          >
            Student
          </p>
          <p
            className={`${
              currentAccountType == "Instructor" ? "bg-black " : ""
            } rounded-full  px-5 py-2`}
            onClick={() => {
              setCurrentAccountType("Instructor");
            }}
          >
            Instructor
          </p>
        </div>
        <form className="inputs flex flex-col gap-2 w-full md:w-fit">
          <div className="name flex flex-col md:flex-row  gap-2">
            <div className="firstName flex  flex-col gap-2">
              <label htmlFor="firstName">First Name</label>
              <input
                className="bg-gray-800 px-5 py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                type="text"
                htmlFor="firstName"
                name="firstName"
                placeholder="Enter First Name"
              />
            </div>
            <div className="lastName flex flex-col gap-2">
              <label htmlFor="lastName">Last Name</label>
              <input
                className="bg-gray-800 px-5 py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                type="text"
                htmlFor="lastName"
                name="lastName"
                placeholder="Enter Last Name"
              />
            </div>
          </div>
          <div className="email flex flex-col gap-2">
            <label htmlFor="email">Email</label>
            <input
              className="bg-gray-800 px-5 py-2 text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
              type="email"
              htmlFor="email"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="passwords flex flex-col md:flex-row w-full  gap-2 ">
            <div className="password flex flex-col gap-2 ">
              <label htmlFor="password">Password</label>
              <div className="flex relative">
                <input
                  className="bg-gray-800 px-5 py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                  type={showPassword ? "text" : "password"}
                  htmlFor="password"
                  name="password"
                  placeholder="Enter Password"
                />
                <button
                  onClick={handleChangeShowPassword}
                  className="text-gray-500 absolute  right-2 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="confirmPassword flex flex-col gap-2">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="flex relative">
                <input
                  className="bg-gray-800 px-5 py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                  type={showConfirmPassword ? "text" : "password"}
                  htmlFor="confirmPassword"
                  name="confirmPassword"
                  placeholder="Enter Confirm Password"
                />
                <button
                  onClick={handleChangeShowConfirmPassword}
                  className="text-gray-500 absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
          </div>
          <input
            type="submit"
            value="Sign Up"
            className="bg-yellow-300 text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
          />
        </form>
      </div>
      <div className="image md:w-[30%]">
        <img src={signup} alt="" />
      </div>
    </section>
  );
};

export default SignUp;
