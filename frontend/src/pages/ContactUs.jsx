import React from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import Reviews from "../components/common/Reviews";
import countryCodes from "../data/countrycode.json";
import { useForm } from "react-hook-form";
import { FaEarthAsia, FaPhone, FaMessage } from "react-icons/fa6";
const data = [
  {
    logo: <FaMessage />,
    title: "Chat on us",
    description: "Our friendly team is here to help.",
    contact: "info@studypoint.com",
  },
  {
    logo: <FaEarthAsia />,
    title: "Visit Us",
    description: "Come and say hello at our office HQ.",
    contact:
      "Akshya Nagar 1st Block 1st Cross, Rammurthy nagar, Bangalore-560016",
  },
  {
    logo: <FaPhone />,
    title: "Call Us",
    description: "Mon - Fri From 8am to 5pm",
    contact: "+91 1234567890",
  },
];

const ContactUs = () => {
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="w-full">
      <NavBar />
      <main className="w-full flex flex-col lg:flex-row justify-center mx-auto p-5 lg:p-10 items-center gap-5 lg:gap-15">
        <section className="bg-gray-800 flex flex-col lg:w-[40%] xl:w-[30%] rounded-xl">
          <div className="flex flex-col gap-5 md:gap-10 p-5 lg:p-10 border-1 border-gray-600 rounded-xl">
            {data.map((item, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                  {item.logo}
                  <h1 className="text-lg md:text-xl lg:text-2xl font-bold ">
                    {item.title}
                  </h1>
                </div>
                <p className=" md:text-md lg:text-lg font-semibold text-gray-300">
                  {item.description}
                </p>
                <p className="md:text-md lg:text-lg font-semibold text-gray-300">
                  {item.contact}
                </p>
              </div>
            ))}
          </div>
        </section>
        <section className="flex flex-col lg:w-[60%] xl:w-[50%] gap-5 md:gap-10 p-5 lg:p-10 border-1 border-gray-600 rounded-xl">
          <h1 className=" text-xl md:text-2xl lg:text-4xl font-bold ">
            Got a Idea? We've got the skills. Let's team up
          </h1>
          <h2 className="text-md md:text-lg lg:text-2xl font-semibold text-gray-300">
            Tell us more about yourself and what you're got in mind.
          </h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="inputs flex flex-col gap-2 w-full md:w-fit"
          >
            <div className="name flex flex-col md:flex-row  gap-2">
              <div className="firstName flex  flex-col gap-2">
                <label htmlFor="firstName">First Name</label>
                <input
                  className="bg-gray-800 px-5 py-2 w-full text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                  type="text"
                  htmlFor="firstName"
                  name="firstName"
                  placeholder="Enter First Name"
                  {...register("firstName", { required: true })}
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
                  {...register("lastName")}
                />
              </div>
            </div>
            {errors.firstName && (
              <p role="alert" className="text-red-500 text-sm ">
                {errors.firstName?.message || "first name is required"}
              </p>
            )}

            <div className="email flex flex-col gap-2">
              <label htmlFor="email">Email</label>
              <input
                className="bg-gray-800 px-5 py-2 text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                type="email"
                htmlFor="email"
                name="email"
                placeholder="Enter Email"
                {...register("email", { required: true })}
              />
            </div>
            {errors.email && (
              <p role="alert" className="text-red-500 text-sm ">
                {errors.email?.message || "email is required"}
              </p>
            )}
            <div className="phone flex flex-col gap-2">
              <label htmlFor="phone">Phone Number</label>
              <div className="flex gap-2">
                <select
                  {...register("countryCode")}
                  className="bg-gray-800 px-1 md:px-2 lg:px-4  py-2 text-md md:text-lg lg:text-2xl w-[45%] md:w-[30%]  rounded-lg text-gray-200"
                >
                  {countryCodes.map((country, index) => (
                    <option key={index} value={country.code}>
                      {country.code} - {country.name}
                    </option>
                  ))}
                </select>
                <input
                  className="bg-gray-800 px-5 py-2 text-md md:text-lg lg:text-2xl  w-full rounded-lg text-gray-200"
                  type="number"
                  name="phone"
                  placeholder="Enter Phone Number"
                  {...register("phone", { required: true })}
                />
              </div>
            </div>
            {errors.phone && (
              <p role="alert" className="text-red-500 text-sm ">
                {errors.phone?.message || "phone number is required"}
              </p>
            )}
            <div className="message flex flex-col gap-2">
              <label htmlFor="message">Message</label>
              <textarea
                className="bg-gray-800 px-5 py-2 text-md md:text-lg lg:text-2xl  rounded-lg text-gray-200"
                rows={5}
                cols={5}
                name="message"
                id="message"
                placeholder="Enter your message here"
                {...register("message", { required: true })}
              />
            </div>
            {errors.message && (
              <p role="alert" className="text-red-500 text-sm ">
                {errors.message?.message || "message is required"}
              </p>
            )}

            <button
              type="submit"
              value="Sign Up"
              className="bg-yellow-300 text-xl my-5 text-gray-700 cursor-pointer px-14 py-2 w-64 self-center rounded-lg"
            >
              Send Message
            </button>
          </form>
        </section>
      </main>
      <Reviews />
      <Footer />
    </div>
  );
};

export default ContactUs;
