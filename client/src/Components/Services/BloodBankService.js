import React from "react";
import { useForm } from "react-hook-form";
import Navbar from "../Home/Navber/Navber";

const BloodBankService = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {};

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
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="Your Name"
          ></input>
        </div>
        {/* email field  */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="your email"
          ></input>
        </div>
        {/* contact field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="your contact number"
          ></input>
        </div>
        {/* blood group  field   */}
        <div class="form-group mb-2">
          <select class="form-select" aria-label="Default select example">
            <option selected>select blood group</option>
            <option value="1">A+</option>
            <option value="2">B+</option>
            <option value="3">AB+</option>
            <option value="4">AB-</option>
            <option value="5">A-</option>
            <option value="6">B-</option>
          </select>
        </div>
        {/* Amount of blood group  field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            // {...register("_id")}
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
