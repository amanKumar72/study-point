import React from "react";
import { useTheme } from "../context/ThemeContext";

function Home() {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="h-screen w-screen bg-white dark:bg-black text-black dark:text-white">
      <h1>Hello , World!</h1>
      <button 
        onClick={toggleTheme}
        className="px-6 py-1 rounded-full bg-gray-300 bg-white dark:bg-black dark:text-white"
      >
        {theme === "dark" ? "☀️" : "🌙"}
      </button>
    </div>
  );
}

export default Home;
