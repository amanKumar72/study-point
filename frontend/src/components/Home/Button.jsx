import React from "react";
import { Link } from "react-router-dom";


const Button = ({active,to,children}) => {
  const classes=active ? `bg-yellow-300  text-black` : `bg-gray-700  text-white`;
  return (
    <Link
      to={to}
      className={`${classes} rounded  font-semibold px-2 py-2 hover:scale-105 transition-all duration-300 shadow-zinc-600  shadow-md`}
    >
     {children}
    </Link>
  );
};

export default Button;
