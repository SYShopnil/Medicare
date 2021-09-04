import React from "react";
import { BiCylinder, BiDonateBlood } from "react-icons/bi";
import { BsPersonCheckFill, BsPersonFill } from "react-icons/bs";
import { FaAmbulance, FaNotesMedical } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { Link } from "react-router-dom";
const AdminNav = () => {
  return (
    <div className="text-center" style={{ height: "300vh" }}>
      <h1 className="mb-3 text-white">
        Admin Portal <hr />{" "}
      </h1>
      <ul className="navbar-nav ms-auto">
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/addAdmin">
            <RiAdminFill className="link" />
            <p className="item">Add Admin</p>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/addDoctor">
            <FaNotesMedical className="link" />
            <p className="item">Add Doctor</p>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/doctors">
            <BsPersonCheckFill className="link" />
            <p className="item"> Doctors</p>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/patients">
            <BsPersonFill className="link" />
            <p className="item"> Patients</p>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/addAmbulance">
            <FaAmbulance className="link" />
            <p className="item">Ambulance Service</p>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/addBlood">
            <BiDonateBlood className="link" />
            <p className="item">Blood Bank</p>
          </Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link" to="/addOxygen">
            <BiCylinder className="link" />
            <p className="item">Oxygen Service</p>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminNav;
