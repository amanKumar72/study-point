import React from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { authApis } from "../services/apis";
import { useParams } from "react-router-dom";
import { successmessage, errormessage} from "../services/Toastify";

const ResetPassword = () => {
  const { token } = useParams();

  const handleForm = (data) => {
    const { password, confirmPassword } = Object.fromEntries(data.entries());
    console.log(password, confirmPassword);
    if (!password || !confirmPassword) {
      errormessage("password and confirm password are mandatory");
      return;
    }
    if (password !== confirmPassword) {
      errormessage("password and confirm password must be same");
      return;
    }
    fetch(authApis.resetPassword, {
      method: "POST",
      body: JSON.stringify({ password, confirmPassword, token }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == false) {
          errormessage(data.message || data.error || "Unable to Reset Password");
          return;
        }
        console.log(data);
        successmessage("Password reset successfully");
      })
      .catch((err) => {
        errormessage(err?.message || "Unable to Reset Password");
      });
  };
  return (
    <div className="w-full">
      <NavBar />
      <main className="flex  flex-col gap-5 items-center  my-10">
        <div className="texts flex flex-col gap-4 ">
          <h1 className=" text-xl  md:text-2xl lg:text-4xl font-bold ">
            Reset Password
          </h1>
        </div>
        <form
          action={handleForm}
          className="inputs flex flex-col gap-2 md:w-[50%] w-[80%]  "
        >
          <div className="password flex flex-col gap-2">
            <label htmlFor="password">Password</label>
            <input
              className="bg-gray-800 px-5 py-2 text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
              type="password"
              htmlFor="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>
          <div className="confirm-password flex flex-col gap-2">
            <label htmlFor="confirm-password">Confirm Password</label>
            <input
              className="bg-gray-800 px-5 py-2 text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
              type="password"
              htmlFor="confirm-password"
              name="confirmPassword"
              placeholder="Enter Confirm Password"
            />
          </div>
          <input
            type="submit"
            value="Reset Password"
            className="bg-yellow-300 text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
          />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ResetPassword;
