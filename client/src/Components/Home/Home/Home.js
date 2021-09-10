import React from "react";
import Banner from "../../../images/banner.jpg";
import AboutUs from "../AboutUs/AboutUs";
import Service from "../AllServices/Service";
import ContactUs from "../ContactUs/ContactUs";
import Navbar from "../Navber/Navber";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <Navbar></Navbar>

      {/* background image    */}
      <div
        className="Banner p-3"
        style={{
          backgroundImage: `url(${Banner})`,
          height: "100vh",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <Service></Service>
      <AboutUs></AboutUs>
      <ContactUs></ContactUs>
    </div>
  );
};

export default Home;
