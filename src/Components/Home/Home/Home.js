import React from "react";
import Banner from "../../../images/banner.jpg";
import Header from "../Header/Header";
import Navbar from "../Navber/Navber";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div
        className="Banner p-3"
        style={{
          backgroundImage: `url(${Banner})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Header></Header>
      </div>
    </div>
  );
};

export default Home;
