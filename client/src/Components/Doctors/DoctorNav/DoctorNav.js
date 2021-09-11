import React from "react";
import { FaListAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./DoctorNav.css";
const DoctorNav = ({ url }) => {
  return (
    <div className="dnav text-center mt-3">
      <h1 className="mb-5 text-dark ">
        Doctor Portal <hr />{" "}
      </h1>
      <ul className="navbar-nav">
        <li className="nav-item mb-2">
          <Link className="nav-link" to={`${url}/yourAppointment`}>
            <FaListAlt className="link" />
            <p className="item"> Your Appoinments</p>
          </Link>
        </li>
        {/* <li className="nav-item mb-2">
          <Link className="nav-link" to= {`${url}/prescription`}>
            <FaPrescriptionBottleAlt className="link" />
          </Link>
          <p className="item">Prescription</p>
        </li> */}
      </ul>
    </div>
  );
};

export default DoctorNav;
