import React from "react";
import { Link } from "react-router-dom";


const Button = ({bg,to,text,textColor}) => {
  return (
    <Link
      to={to}
      className={`bg-${bg} rounded text-${textColor} font-semibold px-2 py-2 hover:scale-105 transition-all duration-300 shadow-zinc-600  shadow-md `}
    >
     {text}
    </Link>
  );
};

export default Button;
