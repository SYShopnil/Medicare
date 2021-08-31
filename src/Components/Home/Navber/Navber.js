import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutProcess } from "../../../redux/Authentication/actions/Action";
import "./Navbar.css";

const Navbar = () => {
  const { isLoggedIn, loggedInUserData } = useSelector((state) => state.login);
  console.log({ isLoggedIn, loggedInUserData });
  const dispatch = useDispatch();
  console.log(isLoggedIn);

  return (
    <div>
      <nav className="navbar navbar-expand-sm navbar-light bg-info p-3">
        <div className="container-fluid">
          <Link style={{ textDecoration: "none" }} to="/home">
            <h1 className="text-white">MedicareBd</h1>
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/doctor">
                  Doctor
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/admin">
                  Admin
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/patientPanel">
                  Patient
                </Link>
              </li>
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                <button
                  onClick={() => dispatch(logoutProcess())}
                  className="nav-item btn btn-danger"
                >
                  <Link className="nav-link" to="/home">
                    Log out
                  </Link>
                </button>
              )}
              {/* <li>
                {isLoggedIn && loggedInUserData !== "" && (
                  <li>{isLoggedIn.personalInfo.firstName}</li>
                )}
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
