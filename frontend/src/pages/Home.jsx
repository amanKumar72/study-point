import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Button from "../components/Home/Button";
import Banner from "../assets/Images/banner.mp4";
import HighLighedText from "../components/Home/HighLighedText";
import CodeBlocks from "../components/Home/CodeBlocks";

function Home() {
  return (
    <>
      {/* <ThemeButton /> */}
      <div className=" relative mx-auto flex flex-col w-11/12 justify-between items-center">
        <Link to={"/signup"} className="w-52 my-5">
          <button className="w-full relative hover:scale-105 bg-gray-700 hover:bg-gray-800  transition-all duration-300  font-bold py-1 px-3 rounded-xl shadow-gray-500 shadow-md  ">
            <div className="flex items-center mr-3">Became an Instructor</div>
            <FaArrowRight className="text-sm absolute right-2 top-3" />
          </button>
        </Link>
        <h1 className="text-xl md:text-3xl font-bold text-center">
          Empower Your Future with <HighLighedText text={"Coding Skills"} />
        </h1>
        <h2 className="text-md md:text-lg my-4 text-gray-400 font-semibold text-wrap text-center ">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </h2>
        <div className="links flex gap-5 my-5">
          <Button
            bg="[#fed60b]"
            to="/courses"
            text="Learn more"
            textColor="black"
          />
          <Button
            bg="gray-700"
            to="/courses"
            text="Book a demo"
            textColor="white"
          />
        </div>
        <video loop muted autoPlay className="w-10/12 shadow-white shadow-md ">
          <source src={Banner} type="video/mp4" />
        </video>
        <div className="flex flex-col gap-5">
          <CodeBlocks
            position={"row"}
            heading={
              <div>
                Unlock your <HighLighedText text="coding potential" /> with our
                online courses.
              </div>
            }
            description="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
            to1="/courses"
            text1="Try it yourself"
            to2="/courses"
            text2="Learn more"
            codingText={`<!doctype html>
<html lang="en" >
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Study-Point</title>
  </head>
  <body>
    <h1 >Hello World</h1>
  </body>
</html>`}
            codingColor="yellow-300"
          />
          <CodeBlocks
            position={"row-reverse"}
            heading={
              <div>
                Start <HighLighedText text="coding in seconds" />
              </div>
            }
            description="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            to1="/courses"
            text1="Continue lesson"
            to2="/courses"
            text2="Learn more"
            codingText={`<!doctype html>
<html lang="en" >
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <title>Study-Point</title>
  </head>
  <body>
    <h1 >Hello World</h1>
  </body>
</html>`}
            codingColor="cyan-500"
          />
        </div>
      </div>
    </>
  );
}

export default Home;
