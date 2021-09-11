import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import "./AddAmbulance.css";
import AllAmbulance from "./AllAmbulance.js/AllAmbulance";
import ApproveAmbulance from "./ApproveAmbulance";

const AddAmbulance = () => {
  const header = useSelector((state) => state.login.headers);
  const [isChange, setIsChange] = useState(false);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    // const contactNumber=
    // console.log(data.contactNumber);
    const ambulanceData = {
      ambulanceInfo: {
        registrationNo: data.Registration,
      },
      driverInfo: {
        name: data.DriverName,
        contactNumber: [data.contactNumber],
      },
    };
    console.log(ambulanceData);
    const response = await axios.post(
      `${baseUrl}/ambulanceService/create`,
      ambulanceData,
      header
    );
    if (response.status === 202 || response.status === 201) {
      setIsChange(!isChange);
    }
    console.log(response);
    e.target.reset();
  };
  return (
    <div>
      <div id="title" className=" mt-5 bg-warning w-50">
        <h1 className="text-center text-light">Add Ambulance</h1>
      </div>
      <div className="col-md-6" id="form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="m-2 text-light">Ambulance Info</h3>

          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("Registration")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Registration No"
            ></input>
          </div>
          <h4 className="text-light m-2">Driver info</h4>
          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("DriverName")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Driver Name"
            ></input>
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("contactNumber")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Contact Number"
            ></input>
          </div>
          <button class="btn btn-dark ">submit</button>
        </form>
      </div>
      <AllAmbulance
        isChange={isChange}
        setIsChange={setIsChange}
      ></AllAmbulance>
      <ApproveAmbulance></ApproveAmbulance>
    </div>
  );
};

export default AddAmbulance;
