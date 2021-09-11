import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/baseUrl/baseurl";
import Navbar from "../Home/Navber/Navber";
const OxygenService = () => {
  const header = useSelector((state) => state.login.headers);
  console.log(header);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const requestOxygen = {
      requestUseInfo: {
        name: data.name,
        contactInfo: {
          email: data.email,
          contactNumber: data.number,
        },
      },
      requestInfo: {
        amount: data.amount,
      },
    };

    const getAllOxygen = await axios.get(`${baseUrl}/oxygenCylinder/get/all`);
    console.log(getAllOxygen.data.data[0]._id);
    if (getAllOxygen.status === 202) {
      const cylinderId = getAllOxygen.data.data[0]._id;
      requestOxygen.cylinderId = cylinderId;
      console.log({ requestOxygen });
      const requestOxygenService = await axios.put(
        `${baseUrl}/oxygenCylinder/request/service`,
        requestOxygen,
        header
      );
      console.log(requestOxygenService.data);
      alert(requestOxygenService.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <h1
        style={{ width: "50%", margin: "10px auto" }}
        className="text-center mt-3 w-40 text-light p-5 bg-dark"
      >
        oxygen service
      </h1>
      <form className="col-md-6" onSubmit={handleSubmit(onSubmit)} action="">
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
            type="email"
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
        {/* contact field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("amount")}
            id="exampleInputEmail1"
            placeholder="amount"
          ></input>
        </div>

        <input type="submit" className="btn btn-info text-light"></input>
      </form>
    </div>
  );
};

export default OxygenService;
