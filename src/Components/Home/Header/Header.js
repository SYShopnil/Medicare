import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <div className="headerBG">
      <div className="card bg-info bg-gradient col-md-4 p-5 mb-5">
        <h1 className="text-center text-light">We help to live others</h1>
        <button className="btn btn-success text-light ">
          Make an Appoinment
        </button>
      </div>
    </div>
  );
};

export default Header;
