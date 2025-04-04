import React from "react";
import HighLighedText from "./HighLighedText";
import Button from "./Button";
import { TypeAnimation } from "react-type-animation";

const CodeBlocks = ({
  position,
  heading,
  description,
  to1,
  text1,
  to2,
  text2,
  codingText,
  codingColor,
}) => {
  const codingColorClass = codingColor ? `text-yellow-300` : "text-[#fafafa]";
  const pos =
    position == "row" ? "flex-col md:flex-row" : "flex-col md:flex-row-reverse";
  return (
    <div className={`flex ${pos} justify-between gap-4 w-11/12 my-2 md:my-8 relative`}>
      <div className="md:w-[50%] feature-card flex flex-col gap-2 items-center ">
        <h1 className="text-xl md:text-3xl font-bold text-center md:text-start ">
          {heading}
        </h1>
        <h2 className="text-md md:text-lg my-4 text-gray-400 font-semibold text-wrap text-center md:text-start">
          {description}
        </h2>
        <div className="links flex gap-5 my-5 ">
          <Button active={true} to={to1}>
            <div>{text1}</div>
          </Button>
          <Button active={false} to={to2}>
            <div>{text2}</div>
          </Button>
        </div>
      </div>
      <div
        className=" w-full md:w-[520px] h-fit flex text-[12px] py-4  relative 
          rounded-lg bg-clip-padding backdrop-filter dark:bg-neutral-800/30 bg-white/30
         backdrop-blur-sm bg-opacity-10 border border-gray-100
 "
      >
        <div className="absolute w-80 h-50 inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-40"></div>
        <div className="w-[10%] text-center flex flex-col font-semibold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
          <p>11</p>
          <p>12</p>
          <p>13</p>
        </div>
        <div
          className={`w-[90%] flex-col gap-2 font-semibold ${codingColorClass}`}
        >
          <TypeAnimation
            sequence={[codingText, 1000, ""]}
            cursor={true}
            style={{
              whiteSpace: "pre-line",
            }}
            omitDeletionAnimation={true}
            repeat={Infinity}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeBlocks;
