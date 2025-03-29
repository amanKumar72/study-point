import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="px-6 py-1 rounded-full bg-gray-300 dark:bg-black dark:text-white"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
};

export default ThemeButton;
