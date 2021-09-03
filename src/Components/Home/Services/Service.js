import React from "react";
import { Link } from "react-router-dom";
import Ambulance from "../../../images/Ambulance.png";
import BloodBank from "../../../images/bloodBank.jpg";
import Doctor from "../../../images/Doctor.jpg";
import Oxygen from "../../../images/oxygen.jpg";
import "./Service.css";

const Service = () => {
  const serviceList = [
    {
      image: BloodBank,
      name: "Blood Bank",
    },
    {
      image: Ambulance,
      name: "Ambulance Service",
    },
    {
      image: Doctor,
      name: "24/7 Available Doctor",
    },
    {
      image: Oxygen,
      name: "Oxygen Service",
    },
  ];
  return (
    <div id="service" className="text-center bg-info bg-gradient">
      <h1 className="bg-success w-20 p-3 text-light text-center">
        {" "}
        Our Services
      </h1>
      <div className="row p-5 mt-5">
        {serviceList.map((s) => (
          <div className="col-md-3">
            <div className="card shadow rounded" style={{ width: "18rem" }}>
              <div className="card-body" style={{ height: "10%" }}>
                <img
                  style={{ height: "180px" }}
                  src={s.image}
                  className="card-img-top mb-3"
                  alt="pic"
                ></img>
                <h5 className="card-title mb-3 bg-dark bg-gradient text-light p-2">
                  {s.name}
                </h5>
                <p className="card-text mb-3 ">
                  Some quick example text to build on the card title and make up
                  the bulk of the card's content.
                </p>
                <Link href="#" class="text-dark btn btn-outline-info">
                  Go somewhere
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
