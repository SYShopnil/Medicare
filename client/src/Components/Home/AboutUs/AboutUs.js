import React from "react";
import aboutImage from "../../../images/bg.jpg";
import "./AboutUs.css";

function AboutUs() {
  return (
    <div className="about">
      {/* title part  */}
      <h1
        id="about-title"
        className="bg-info bg-gradient text-light text-center p-5"
      >
        About Us
      </h1>
      <div className="row">
        <div className="col-md-6 mt-5 p-5">
          {/* about us Image   */}
          <img src={aboutImage} alt="" />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
