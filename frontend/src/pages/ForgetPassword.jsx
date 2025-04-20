import React from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { authApis } from "../services/apis";
import { errormessage, successmessage } from "../services/Toastify";
const ForgetPassword = () => {
  const handleForm = (data) => {
    const { email } = Object.fromEntries(data.entries());
    console.log(email);
    if (!email) {
      errormessage("email is mandatory");
      return;
    }
    fetch(authApis.resetPasswordToken, {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.success == false) {
          errormessage(data.message || data.error || "Unable to login");
          return;
        }
        console.log(data);
        successmessage("Password reset link sent successfully");
      })
      .catch((err) => errormessage(err?.message || "unable to login"));
  };
  return (
    <div className="w-full">
      <NavBar />
      <main className="flex  flex-col gap-5 items-center  my-10">
        <div className="texts flex flex-col gap-4 ">
          <h1 className=" text-xl  md:text-2xl lg:text-4xl font-bold ">
            Forget Password
          </h1>
        </div>
        <form
          action={handleForm}
          className="inputs flex flex-col gap-2 md:w-[50%] w-[80%]  "
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
          <input
            type="submit"
            value="Send Link"
            className="bg-yellow-300 text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
          />
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default ForgetPassword;
