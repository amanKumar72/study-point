import React, { useState } from "react";
import login from "../assets/Images/login.webp";
import HighLighedText from "../components/Home/HighLighedText";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { authApis } from "../services/apis";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChangeShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleForm = (data) => {
    const { email, password } = Object.fromEntries(data.entries());
    console.log(email, password);
    if (!email || !password) {
      setError("email and password are mandatory");
      return;
    }
    fetch(authApis.login, {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == false) {
          setError(data.message || data.error || "Unable to login");
          return;
        }
        navigate("/dashboard");
      })
      .catch((err) => setError(err?.message || "unable to login"));
  };

  return (
    <div className="w-full">
      <NavBar />

      <section className="flex flex-col md:flex-row gap-10 items-center  w-full p-5 md:p-10 lg:p-25 ">
        <div className="form flex flex-col gap-5 md:w-[70%]">
          <div className="texts flex flex-col gap-4 ">
            <h1 className=" text-xl  md:text-2xl lg:text-4xl font-bold ">
              Welcome Back
            </h1>
            <h2 className=" text-md md:text-lg lg:text-xl font-semibold text-gray-300">
              Build skills for today, tomorrow, and beyond.
            </h2>
            <h3 className="text-md md:text-lg lg:text-xl italic">
              <HighLighedText text="  Education to future-proof your career." />
            </h3>
          </div>
          <form
            action={handleForm}
            className="inputs flex flex-col   gap-2 w-full md:w-[70%] lg:w-[50%] "
          >
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
            {error && (
              <p className="text-red-500 text-md md:text-lg lg:text-xl">
                {error}
              </p>
            )}
            <div className="flex justify-end">
              <Link to="/forget-password" className="text-blue-500  underline">
                Forget Password
              </Link>
            </div>
            <input
              type="submit"
              value="Login"
              className="bg-yellow-300 text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
            />
            <Link to="/signup" className="text-blue-500 self-center underline">
              Not have an account ? create now
            </Link>
          </form>
        </div>
        <div className="image md:w-[30%]">
          <img src={login} alt="" />
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Login;
