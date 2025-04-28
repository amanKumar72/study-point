import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";

const Dashboard = () => {
  const { user } = useSelector((state) => state.profile);
  console.log(user);

  return (
    <div>
      <NavBar></NavBar>
      <main>
        
      </main>
      <Footer></Footer>
    </div>
  );
};

export default Dashboard;
