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
                <Link className="nav-link" to="/appoinments">
                  Appoinments
                </Link>
              </li>
              {/* services section  */}
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Our services
                </Link>
                <ul
                  class="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <Link class="dropdown-item" to="bloodBank">
                      Blood Bank
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/oxygenService">
                      Oxygen Service
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/ambulanceService">
                      Ambulance Service
                    </Link>
                  </li>
                </ul>
              </li>
              {/* Dashboard dropdown    */}
              <li class="nav-item dropdown">
                <Link
                  class="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDarkDropdownMenuLink"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Dashboard
                </Link>
                <ul
                  class="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="navbarDarkDropdownMenuLink"
                >
                  <li>
                    <Link class="dropdown-item" to="/doctor">
                      Doctor
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/admin">
                      Admin
                    </Link>
                  </li>
                  <li>
                    <Link class="dropdown-item" to="/patientPanel">
                      Patient
                    </Link>
                  </li>
                </ul>
              </li>
              {/* doctor link  */}

              {/* <li className="nav-item">
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
              </li> */}
              {!isLoggedIn ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
              ) : (
                <li
                  onClick={() => dispatch(logoutProcess())}
                  className="nav-item"
                >
                  <Link className="nav-link bg-danger" to="/home">
                    Log out
                  </Link>
                </li>
              )}
              <li className="nav-item ms-1">
                <p className="nav-link ">
                  {isLoggedIn && loggedInUserData != "" && (
                    <li className="bg-success p-1">{`Hello!! ${loggedInUserData.personalInfo.firstName} ${loggedInUserData.personalInfo.lastName}`}</li>
                  )}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
