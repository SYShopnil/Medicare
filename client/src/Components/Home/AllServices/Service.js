import React from "react";
import { useHistory } from "react-router-dom";
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
      description:
        "We have a enrich blood bank service Because every drop of blood is like a breath for someone ",
    },
    {
      image: Ambulance,
      name: "Ambulance Service",
      description:
        "We are here for your service at any time in 24/7.Our Ambulance will ready to serve you a fast service",
    },
    {
      image: Doctor,
      name: "24/7 Available Doctor",
      description:
        "Medicare provides specialist doctors so that we can help you to lead a healthy life",
    },
    {
      image: Oxygen,
      name: "Oxygen Service",
      description:
        "We provide emergency oxygen service. we are there for save your life.",
    },
  ];
  const history = useHistory();

  //serviceHandler
  const serviceHandler = (e, name) => {
    e.preventDefault();
    if (name == "Blood Bank") {
      history.push("/bloodBank");
    } else if (name == "Ambulance Service") {
      history.push("/ambulanceService");
    } else if (name == "24/7 Available Doctor") {
      history.push("/appoinments");
    } else if (name == "Oxygen Service") {
      history.push("/oxygenService");
    }
  };
  return (
    <div id="service" className="text-center bg-info bg-gradient">
      {/* title here   */}
      <h1 className="bg-success w-20 p-5 text-light text-center">
        {" "}
        Our Services
      </h1>
      {/* body part    */}
      <div className="row p-5 mt-5">
        {/* map loop function   */}
        {serviceList.map((s) => (
          <div className="col-md-3">
            <div className="card shadow rounded" style={{ width: "18rem" }}>
              <div className="card-body" style={{ height: "10%" }}>
                <img
                  style={{ height: "180px", cursor: "pointer" }}
                  src={s.image}
                  className="card-img-top mb-3"
                  alt="pic"
                  onClick={(e) => serviceHandler(e, s.name)}
                ></img>
                <h5
                  style={{ cursor: "pointer" }}
                  onClick={(e) => serviceHandler(e, s.name)}
                  className="card-title mb-3 bg-dark bg-gradient text-light p-2"
                >
                  {s.name}
                </h5>
                <p className="card-text mb-3 ">{s.description}</p>
                {/* <Link to='/' class="text-dark btn btn-outline-info">
                  Go somewhere
                </Link> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Service;
