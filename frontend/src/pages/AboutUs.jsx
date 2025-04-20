import React from "react";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import HighLighedText from "../components/Home/HighLighedText";
import aboutUs1 from "../assets/Images/aboutus1.webp";
import aboutUs2 from "../assets/Images/aboutus2.webp";
import aboutUs3 from "../assets/Images/aboutus3.webp";
import Reviews from "../components/common/Reviews";
import { useForm } from "react-hook-form";
import countryCodes from "../data/countrycode.json";
import { useNavigate } from "react-router-dom";
import { successmessage } from "../services/Toastify";

const images = [aboutUs1, aboutUs2, aboutUs3];

const specifications = [
  { value: "5K", title: "Active Students" },
  { value: "20+", title: "Mentors" },
  { value: "100+", title: "Courses" },
  { value: "50+", title: "Awards" },
];
const AboutUs = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    successmessage("Thankyou for connect with us 😊")
    navigate("/thank-you", {
      state: {
        ...data,
        message:
          "We’ve received your message and will get back to you as soon as possible.",
      },
    });
  };
  return (
    <main className="w-full">
      <NavBar />

      <section className="section1 flex flex-col items-center ">
        <h1 className="text-xl md:text-2xl lg:text-4xl w-90% xl:w-[60%] text-center my-2 py-2 md:my-5 font-bold">
          Driving Innovation in Online Education for a{" "}
          <HighLighedText text="Brighter Future" />
        </h1>
        <h2 className=" md:text-lg text-gray-300 w-[90%] xl:w-[60%] text-center my-2 py-2 md-my-5 font-semibold">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
          <div className="flex flex-col md:flex-row gap-5 md:gap-15 xl:gap-20 my-2 md:my-5 justify-center">
            {images.map((imgSrc, ind) => (
              <img
                src={imgSrc}
                key={ind}
                alt="image"
                className="md:w-48 md:h-48 xl:w-full xl:h-full object-cover"
              />
            ))}
          </div>
        </h2>
        <h2 className="text-xl md:text-2xl lg:text-4xl w-90% xl:w-[60%] text-center my-2 py-2 md:my-5 font-bold">
          We are passionate about revolutionizing the way we learn. Our
          innovative platform{" "}
          <HighLighedText text="combines technology, expertise, and community" />{" "}
          to create an unparalleled educational experience.
        </h2>
      </section>
      <div className=" h-[1px] bg-gray-500"></div>
      <section className="section2 py-2  flex flex-col md:flex-row px-2 md:px-5 lg:px-10  items-center  ">
        <div className=" my-2 flex flex-col text-center md:text-start ">
          <h1 className="text-xl md:text-2xl lg:text-4xl w-90% xl:w-[60%]  my-2 py-2 md:my-5 font-bold">
            <HighLighedText text="Our Founding Story" />
          </h1>
          <h2 className=" md:text-lg text-gray-300 w-[90%] xl:w-[60%] my-2 py-2 md-my-5 font-semibold">
            Our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world.
          </h2>
          <h2 className=" md:text-lg text-gray-300 w-[90%] xl:w-[60%]  my-2 py-2 md-my-5 font-semibold">
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </h2>
        </div>
        <img
          src={aboutUs1}
          className="md:w-52 md:h-52 lg:w-full lg:h-full"
          alt=""
        />
      </section>
      <section className="section2 py-2  flex flex-col md:flex-row px-2 md:px-5 lg:px-10  justify-between  ">
        <div className="lg:w-[48%]">
          <h1 className="text-xl md:text-2xl lg:text-4xl  my-2 py-2 md:my-5 font-bold">
            <span className="bg-gradient-to-r from-red-500 via-amber-500 to-amber-400 inline-block text-transparent bg-clip-text">
              Our Vision
            </span>
          </h1>
          <h2 className=" md:text-lg text-gray-300  my-2 py-2 md-my-5 font-semibold">
            With this vision in mind, we set out on a journey to create an
            e-learning platform that would revolutionize the way people learn.
            Our team of dedicated experts worked tirelessly to develop a robust
            and intuitive platform that combines cutting-edge technology with
            engaging content, fostering a dynamic and interactive learning
            experience.
          </h2>
        </div>
        <div className="lg:w-[48%]">
          <h1 className="text-xl md:text-2xl lg:text-4xl  my-2 py-2 md:my-5 font-bold">
            <span className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-400 inline-block text-transparent bg-clip-text">
              Our Mission
            </span>
          </h1>
          <h2 className=" md:text-lg text-gray-300  my-2 py-2 md-my-5 font-semibold">
            Our mission goes beyond just delivering courses online. We wanted to
            create a vibrant community of learners, where individuals can
            connect, collaborate, and learn from one another. We believe that
            knowledge thrives in an environment of sharing and dialogue, and we
            foster this spirit of collaboration through forums, live sessions,
            and networking opportunities.
          </h2>
        </div>
      </section>
      <section className="flex items-center justify-center mx-auto gap-2 md:gap-10 lg:gap-20 bg-gray-700 py-5 md:py-10">
        {specifications.map(({ value, title }, ind) => (
          <div key={ind} className="flex flex-col items-center">
            <h2 className=" md:text-2xl lg:text-4xl  font-bold">{value}</h2>
            <h3 className=" md:text-2xl text-gray-300 lg:text-4xl  font-bold">
              {" "}
              {title}
            </h3>
          </div>
        ))}
      </section>
      <div className="w-full">
        <section className="flex flex-col gap-10 items-center w-full p-5 md:p-10 lg:p-15">
          <h1 className=" text-xl md:text-2xl lg:text-4xl font-bold ">
            Connect With Us
          </h1>{" "}
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
      </div>
      <Reviews />
      <Footer />
    </main>
  );
};

export default AboutUs;
