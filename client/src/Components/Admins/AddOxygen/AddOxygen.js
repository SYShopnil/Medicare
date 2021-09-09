import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import ApproveOxygen from "./ApproveOxygen";
import Oxygen from "./Oxygen";

const AddOxygen = () => {
  const header = useSelector((state) => state.login.headers);
  console.log(header);
  const { register, handleSubmit } = useForm();
  const [isChange, setIsChange] = useState(false);

  const onSubmit = async (data, e) => {
    const oxygenData = {
      amount: data.amount,
    };

    const response = await axios.post(
      `${baseUrl}/oxygenCylinder/create`,
      oxygenData,
      header
    );
    if (response.status === 201 || response.status === 202) {
      setIsChange(!isChange);
    }
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

          <button class="btn btn-warning text-light">Submit</button>
        </form>
      </div>

      <div className="col-md-12 text-center">
        <h1 className="text-light bg-success w-50 text-center mb-5">
          oxygen amount
        </h1>
        <Oxygen isChange={isChange}></Oxygen>
      </div>
      <ApproveOxygen />
    </div>
  );
};

export default AddOxygen;
