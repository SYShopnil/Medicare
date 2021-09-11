import React from "react";
import { BsCardChecklist } from "react-icons/bs";
import { Link } from "react-router-dom";

const PatientNav = ({ url }) => {
  // console.log(url);
  return (
    <div>
      <ul className="navbar-nav ms-auto">
        <h1 className="mt-2 mb-5">
          Patient Portal <hr />
        </h1>

        <li className="nav-item mb-2">
          <Link className="nav-link" to={`${url}/patientAppointments`}>
            <BsCardChecklist className="link" />
            <p className="item">Your Appointments</p>
          </Link>
        </li>
        {/* <li className="nav-item mb-2">
          <Link className="nav-link" to= {`${url}/prescription`}>
            <GiMedicinePills className="link" />
            <p className="item">Download Prescription</p>
          </Link>
        </li> */}
      </ul>
    </div>
  );
};

export default PatientNav;
