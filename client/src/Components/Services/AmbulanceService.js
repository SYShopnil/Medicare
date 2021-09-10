import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/baseUrl/baseurl.js";
import Navbar from "../Home/Navber/Navber";

const AmbulanceService = () => {
  const header = useSelector((state) => state.login.headers);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const ambulanceData = {
      requestUseInfo: {
        name: data.name,
        contactInfo: {
          email: data.email,
          contactNumber: data.number,
          address: data.address,
        },
      },
    };
    const ambulanceResponse = await axios.post(
      `${baseUrl}/ambulanceService/make/new/service`,
      ambulanceData,
      header
    );
    console.log(ambulanceResponse);
  };

  return (
    <div>
      <Navbar />
      <h1
        style={{ width: "50%", margin: "10px auto" }}
        className="text-center bg-warning mt-3  text-light p-5 "
      >
        Ambulance service
      </h1>
      <form className="col-md-6" action="" onSubmit={handleSubmit(onSubmit)}>
        {/* firstname field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("name")}
            id="exampleInputEmail1"
            placeholder="Your Name"
          ></input>
        </div>
        {/* email field  */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("email")}
            id="exampleInputEmail1"
            placeholder="your email"
          ></input>
        </div>
        {/* contact field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("number")}
            id="exampleInputEmail1"
            placeholder="your contact number"
          ></input>
        </div>
        {/* blood group  field   */}
        <div class="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            {...register("address")}
            id="exampleInputEmail1"
            placeholder="your address"
          ></textarea>
        </div>

        <input type="submit" className="btn btn-danger text-light"></input>
      </form>
    </div>
  );
};

export default AmbulanceService;
