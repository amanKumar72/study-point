import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import Button from "../components/Home/Button";
import Banner from "../assets/Images/banner.mp4";
import HighLighedText from "../components/Home/HighLighedText";
import Footer from "../components/common/Footer";
import CodeBlocks from "../components/Home/CodeBlocks";
import Logo1 from "../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../assets/TimeLineLogo/Logo4.svg";
import TimeLineImage from "../assets/Images/TimeLineImage.png";
import Know_your_progress from "../assets/Images/Know_your_progress.png";
import Instructor from "../assets/Images/Instructor.png";
import Compare_with_others from "../assets/Images/Compare_with_others.png";
import Plan_your_lessons from "../assets/Images/Plan_your_lessons.png";
import ReviewCard from "../components/Home/ReviewCard";
import { reviewApis } from "../services/apis";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
// Import required modules
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import ExploreMore from "../components/Home/ExploreMore";

const s2Data = [
  {
    icon: Logo1,
    heading: "Leadership",
    description: "Fully committed to the success company",
  },
  {
    icon: Logo2,
    heading: "Responsibility",
    description: "Fully committed to the success company",
  },
  {
    icon: Logo3,
    heading: "Flexibility",
    description: "The ability to switch is an important skills",
  },
  {
    icon: Logo4,
    heading: "Solve the problem",
    description: "Code your way to a solution",
  },
];

function Home() {
  const [reviews, setReviews] = useState(null);
  useEffect(() => {
    fetch(reviewApis.getReviews)
      .then((res) => res.json())
      .then((data) => {
        setReviews(data?.ratings);
      })
      .catch((err) => console.log("err", err));
  }, []);
  return (
    <main className="home overflow-y-hidden">
      {/* <ThemeButton /> */}
      <section className=" relative h-fit mx-auto flex flex-col justify-between items-center">
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
          <Button active={true} to="/courses">
            <div>Learn More</div>
          </Button>
          <Button active={false} to="/courses">
            <div>Book a Demo</div>
          </Button>
        </div>
        <video loop muted autoPlay className="w-10/12 shadow-white shadow-md ">
          <source src={Banner} type="video/mp4" />
        </video>
        <div className="flex flex-col items-center gap-5">
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
          />
        </div>
      </section>
      <section className="section2 bg-[#fafafa] text-[#000814] my-8">
        <div className="bg_cross h-[310px]">
          <div className="h-[200px] w-full "></div>
          <div className="buttons my-5  flex gap-5 md:gap-15  items-center w-11/12 justify-center">
            <Button active={true} to="/courses">
              <div>Learn more</div>
            </Button>
            <Button active={false} to="/courses">
              <div>Book a demo</div>
            </Button>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-10 m-5 md:m-15 w-11/12">
          <h1 className="text-2xl md:text-5xl font-bold text-center md:text-start">
            Get the skills you need for a{" "}
            <HighLighedText text={"job that is in demand."} />
          </h1>
          <div className="text-center md:text-start">
            <h3 className="text-md md:text-lg my-4 text-gray-700 font-semibold text-wrap text-center md:text-start">
              The modern StudyNotion is the dictates its own terms. Today, to be
              a competitive specialist requires more than professional skills.
            </h3>
            <Button to="/courses" active={true}>
              Learn more
            </Button>
          </div>
        </div>
        <div className="timeLine flex flex-col md:flex-row gap-10 m-10 md:m-15 ">
          <div className="flex flex-col md:w-[50%]">
            {s2Data.map((item, index) => {
              return (
                <div key={index} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <img src={item.icon} alt="logo" />
                    <div className="ml-4 flex flex-col gap-1">
                      <h3 className="text-lg font-semibold">{item.heading}</h3>
                      <p className="text-gray-500">{item.description}</p>
                    </div>
                  </div>
                  {s2Data.length - 1 !== index && (
                    <div className="ml-5 md:ml-2  w-[1px] h-10 md:h-20 overflow-hidden bg-gray-300"></div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex flex-col relative md:w-[50%]">
            <div className="shadow-2xl shadow-cyan-400 w-[90%] md:w-full">
              <img src={TimeLineImage} alt="" className="" />
            </div>
            <div className="flex relative flex-row gap-3 p-2 justify-between w-[90%] md:w-[80%] md:mx-auto bottom-[30px] z-10  bg-green-600 text-[#fafafa]  ">
              <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-2xl font-bold">10</h1>
                <h3 className="text-md md:text-lg">Years experiences</h3>
              </div>
              <div className="flex flex-col gap-1">
                <h1 className="text-xl md:text-2xl font-bold">200+</h1>
                <h3 className="text-md md:text-lg">Types of Courses</h3>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center p-5 ">
          <div className="md:px-15">
            <h1 className=" text-3xl  md:text-5xl text-center  ">
              Your swiss knife for{" "}
              <HighLighedText text={"learning any language"}></HighLighedText>
            </h1>
            <h3 className="tex--xl md:text-2xl  text-center mt-3">
              Using spin making learning multiple languages easy. with 20+
              languages realistic voice-over, progress tracking, custom schedule
              and more.
            </h3>
          </div>
          <div className="flex md:flex-row flex-col p-10 ">
            <img
              src={Know_your_progress}
              alt=""
              className="md:w-1/3  xl:w-full object-contain "
            />
            <img
              src={Compare_with_others}
              alt=""
              className="md:w-1/3  xl:w-full object-contain "
            />
            <img
              src={Plan_your_lessons}
              alt=""
              className="md:w-1/3  xl:w-full object-contain "
            />
          </div>
        </div>
        <div className="flex justify-center p-5 md:p-10 ">
          <Button active={true} to="/signup">
            <div>Learn more</div>
          </Button>
        </div>
      </section>
      <ExploreMore></ExploreMore>
      <section className="h-fit mx-auto flex flex-col gap-10 p-10 md:flex-row justify-between items-center">
        <div className="shadow-xl shadow-cyan-400 ">
          <img src={Instructor} alt="" />
        </div>
        <div className="flex flex-col gap-10">
          <h1 className=" text-3xl  md:text-5xl ">
            Became an <HighLighedText text={"Instrucor"}></HighLighedText>
          </h1>
          <h2 className="text-md md:text-lg  text-gray-300 ">
            Instructors from around the world teach millions of students on
            StudyNotion. We provide the tools and skills to teach what you love.
          </h2>
          <Button active={true} to={"/signup"}>
            <div className="flex relative w-48 ">
              Start Teaching Today{" "}
              <FaArrowRight className=" absolute right-2 top-2"></FaArrowRight>
            </div>
          </Button>
        </div>
      </section>
      <section className="review flex flex-col items-center gap-5 md:gap-10 lg:gap-15  ">
        <h1 className=" text-3xl md:text-5xl text-center ">
          Reviews from learners
        </h1>
        <Swiper
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween:10
            },
            830: {
              slidesPerView: 3,
              spaceBetween:10
            },
            1100: {
              slidesPerView: 4,
              spaceBetween:10
            },
            1440: {
              slidesPerView: 5,
              spaceBetween:15
            },
          }}
          loop={true}
          freeMode={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          modules={[FreeMode, Pagination, Autoplay]}
          className="w-full "
        >
          {reviews?.map((review, index) => {
            return (
              <SwiperSlide key={index} >
                <ReviewCard review={review} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
      <Footer />
    </main>
  );
}

export default Home;
