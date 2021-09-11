import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { baseUrl } from "../../utils/baseUrl/baseurl.js";
import Navbar from "../Home/Navber/Navber";

const BloodBankService = () => {
  const header = useSelector((state) => state.login.headers);
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    e.preventDefault();
    const bloodData = {
      requestUseInfo: {
        name: data.name,
        contactInfo: {
          email: data.email,
          contactNumber: data.number,
        },
      },
      requestInfo: {
        bloodGroup: data.blood,
        amount: data.amount,
      },
    };
    console.log(bloodData);
    const bloodResponse = await axios.post(
      `${baseUrl}/bloodBankService/make/request`,
      bloodData,
      header
    );
    console.log(bloodResponse);
    alert(bloodResponse.data.message)
  };

  return (
    <div>
      <Navbar />
      <h1 className="text-center mt-3 w-40 text-light p-5 bg-success">
        Blood Bank Service
      </h1>
      <form className="col-md-6" onSubmit={handleSubmit(onSubmit)} action="">
        {/* Name field   */}
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
          <select
            {...register("blood")}
            class="form-select"
            aria-label="Default select example"
          >
            <option selected>select blood group</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="A-">A-</option>
            <option value="B-">B-</option>
          </select>
        </div>
        {/* Amount of blood group  field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("amount")}
            id="exampleInputEmail1"
            placeholder="Amount"
          ></input>
        </div>
        <input type="submit" className="btn btn-info text-light"></input>
      </form>
    </div>
  );
};

export default BloodBankService;
