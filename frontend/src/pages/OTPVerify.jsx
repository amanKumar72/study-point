import React, { useState, useRef } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { CiTimer } from "react-icons/ci";
import { Link } from "react-router-dom";
import { authApis } from "../services/apis";
import { useNavigate } from "react-router-dom";

const OTPVerify = ({ formData }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRefs.current[index].value = "";
        otp[index] = "";
        inputRefs.current[index - 1].focus();
      } else if (index == 0) {
        otp[index] = "";
        inputRefs.current[index].value = "";
      }
    }
  };

  const handleOtp = () => {
    fetch(authApis.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, otp: otp.join("") }),
    })
      .then((res) => res.json())
      .then((resData) => {
        if (resData?.success == false) {
          return setError(
            resData.error || resData.message || "Failed to verify OTP"
          );
        }
        navigate("/thank-you", {
          state: {
            ...formData,title:"🎉 Account Created Successfully!",
            message:
              "Welcome aboard! Your account has been created successfully. You can now log in and start exploring all the features we offer. We're excited to have you with us!",
          },
        });
      })
      .catch((err) => {
        setError(err?.message || "Failed to verify OTP");
      });
    setOtp(new Array(6).fill(""));
  };

  return (
    <section className="flex w-full m-auto">
      <div className="flex flex-col m-auto px-4 md:px-8 gap-5 md:gap-8">
        <h1 className="text-xl md:text-2xl lg:text-4xl font-bold ">
          Verify Email
        </h1>
        <h2 className="text-md md:text-lg lg:text-xl">
          A verification code has been sent to you. Enter the code below
        </h2>
        <div className="boxes flex gap-2 md:gap-5">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              name={`otp${index + 1}`}
              value={otp[index]}
              maxLength="1"
              ref={(el) => (inputRefs.current[index] = el)}
              onChange={(e) => handleChange(e.target, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className="w-10 md:w-16 md:h-16 rounded-lg bg-gray-800 h-10 mt-0 text-2xl text-center text-white"
            />
          ))}
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div className="self-center">
          <button
            onClick={handleOtp}
            className="bg-yellow-300 text-xl my-5 text-gray-700 font-semibold cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
          >
            Verify Email
          </button>
        </div>
        <div className="flex justify-between w-full ">
          <Link to="/signup" className="flex gap-2 relative">
            <FaArrowLeft className="absolute top-1 -left-6"></FaArrowLeft> Back
            to signup
          </Link>
          <p className="text-blue-400">
            <CiTimer className="inline font-bold" />{" "}
            <Link to="#" onClick={handleOtp}>
              Resend
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default OTPVerify;
