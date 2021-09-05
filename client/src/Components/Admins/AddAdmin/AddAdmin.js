import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import ImageUploader from "../../../utils/singleImageUploader/ImageUploader";
import {useRouteMatch, useLocation} from 'react-router-dom'
import "./AddAdmin.css";
const AddAdmin = () => {
  const a = useLocation()
  console.log(a) 
  const { register, handleSubmit } = useForm();
  // console.log(register);
  const [image, setImage] = useState({});
  const fileHandler = (file) => {
    console.log(file.size);
    setImage(file);
  };
  const onSubmit = async (data, e) => {
    const postAdmin = {
      personalInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        contact: {
          email: data.email,
          number: [data.contact],
        },
      },
      profileImage: image,
      officialInfo: {
        category: [data.category],
      },
      password: data.password,
    };
    console.log(postAdmin);

    const response = await axios.post(`${baseUrl}/admin/create`, postAdmin);
    console.log(response);
    e.target.reset();
  };
  return (
    <div className="create-admin p-3 bg-grey">
      <h1 className="text-light bg-success text-center">
        Create Admin <hr />
      </h1>
      <div>
        <form className="col-md-6" onSubmit={handleSubmit(onSubmit)} action="">
          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("firstName")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="First Name"
            ></input>
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              {...register("lastName")}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Last Name"
            ></input>
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              {...register("contact")}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="phone"
            ></input>
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              {...register("email")}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="email"
            ></input>
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              {...register("category")}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="category"
            ></input>
          </div>
          <ImageUploader filePassHandler={fileHandler} />
          <div class="form-group mb-2">
            <input
              type="password"
              {...register("password")}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="password"
            ></input>
          </div>

          <button className="bt btn-primary">Create Admin</button>
        </form>
      </div>
    </div>
  );
};

export default AddAdmin;
