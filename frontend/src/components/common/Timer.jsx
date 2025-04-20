import React, { useState, useEffect } from "react";

const Timer = ({ seconds = 30 ,handleTimer}) => {
  const [time, setTime] = useState({
    min: Math.floor(seconds / 60),
    sec: seconds % 60,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        const { min, sec } = prevTime;

        if (min === 0 && sec === 0) {
          clearInterval(timer);
          handleTimer()
          return prevTime;
        }

        if (sec > 0) {
          return { ...prevTime, sec: sec - 1 };
        } else {
          return { min: min - 1, sec: 59 };
        }
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup on unmount
  }, []);

  return (
    <span>
      <span>{String(time.min).padStart(2, "0")}</span>:
      <span>{String(time.sec).padStart(2, "0")}</span>
    </span>
  );
};

export default Timer;
