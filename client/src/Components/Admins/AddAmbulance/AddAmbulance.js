import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import "./AddAmbulance.css";

const AddAmbulance = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const ambulanceData = {
      ambulanceInfo: {
        registrationNo: data.Registration,
      },
      contactNumber: {
        name: data.DriverName,
        contactNumber: [data.ContactNumber],
      },
    };
    console.log(ambulanceData);
    const response = await axios.post(
      `${baseUrl}/ambulanceService/create`,
      ambulanceData
    );
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
    </div>
  );
};

export default AddAmbulance;
