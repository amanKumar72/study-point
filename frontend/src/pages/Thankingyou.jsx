import React from "react";
import Header from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import { Link, useLocation } from "react-router-dom";

const Thankingyou = () => {
  const location = useLocation();
  const data = location.state;

  return (
    <div>
      <Header />
      <main className="flex flex-col items-center justify-center  p-6 text-center">
        <div className="bg-gray-700 p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-3xl font-bold text-yellow-300 mb-4">
            {data?.title || "Thank You !"}
          </h1>
          <p className="mb-6">
            {data?.message ||
              "We’ve received your message and will get back to you as soon as possible."}
          </p>
          <Link
            to="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-full transition"
          >
            Back to Home
          </Link>
        </div>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Thankingyou;
