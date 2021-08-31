import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

const AddOxygen = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const oxygenData = {
      amount: data.amount,
    };
    const response = await axios.post(
      `${baseUrl}/oxygenCylinder/create`,
      oxygenData
    );
    console.log(response);
    e.target.reset();
  };
  return (
    <div>
      <div id="title" className="bg-dark p-2 w-50 mt-5">
        <h1 className="text-center text-light">Oxygen Service</h1>
      </div>
      <div className="col-md-6" id="title">
        <form onSubmit={handleSubmit(onSubmit)} action="">
          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("amount")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Amount"
            ></input>
          </div>

          <button class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddOxygen;
