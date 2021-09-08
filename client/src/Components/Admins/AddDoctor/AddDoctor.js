import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import ImageUploader from "../../../utils/singleImageUploader/ImageUploader";
import "./AddDoctor.css";

const AddDoctor = () => {
  const header = useSelector((state) => state.login.headers);

  const { register, handleSubmit } = useForm();
  const [image, setImage] = useState({});
  const [show, setShow] = useState(false);

  const showHandler1 = (e) => {
    e.preventDefault();
    setShow({
      ...show,
      show1: !show.show1,
    });
  };
  const showHandler2 = (e) => {
    e.preventDefault();
    setShow({
      ...show,
      show2: !show.show2,
    });
  };
  const fileHandler = (file) => {
    console.log(file.size);
    setImage(file);
  };
  const onSubmit = async (data, e) => {
    const postDoctor = {
      personalInfo: {
        firstName: data.firstName,
        lastName: data.lastName,
        sex: data.sex,
        contact: {
          number: [data.phone],
          email: data.email,
        },
      },

      profileImage: image,
      officialInfo: {
        educationalHistory: [
          {
            degreeName: data.degree,
            institute: data.institute,
            year: data.year,
          },
        ],
        category: [data.category],
      },
      password: data.password,
      confirmPassword: data.confirmPassword,
    };
    console.log(postDoctor);
    const response = await axios.post(
      `${baseUrl}/doctor/create`,
      postDoctor,
      header
    );
    console.log(response);
    e.target.reset();
  };
  return (
    <div className="text-center mt-5 p-5">
      <h1 className="doctor-title text-white bg-primary w-50">Create Doctor</h1>
      <form className="col-md-6" onSubmit={handleSubmit(onSubmit)} action="">
        {/* firstname field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("firstName")}
            id="exampleInputEmail1"
            placeholder="first name"
          ></input>
        </div>

        {/* lastname   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            {...register("lastName")}
            id="exampleInputEmail1"
            placeholder="last name"
          ></input>
        </div>
        {/* gender field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            {...register("sex")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="sex"
          ></input>
        </div>

        {/* constact field  */}
        <div class="form-group mb-2">
          <input
            type="text"
            {...register("phone")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="phone number"
          ></input>
        </div>
        <div class="form-group mb-2">
          <input
            type="email"
            {...register("email")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="email"
          ></input>
        </div>
        {/* degree field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            {...register("degree")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="degree"
          ></input>
        </div>
        {/* institute field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            {...register("institute")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="institute"
          ></input>
        </div>
        {/* year field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            {...register("year")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="year"
          ></input>
        </div>
        {/* category field  */}
        <div class="form-group mb-2">
          <input
            type="text"
            {...register("category")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="category"
          ></input>
        </div>
        {/* image upload  */}
        <ImageUploader filePassHandler={fileHandler}></ImageUploader>
        <div class="form-group mb-3 eye">
          <input
            type={show.show1 ? "text" : "password"}
            {...register("password")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="password"
          ></input>
          <i
            style={{ cursor: "pointer" }}
            onClick={showHandler1}
            class="fas fa-eye"
          ></i>
        </div>
        <div class="form-group mb-3 eye">
          <input
            type={show.show2 ? "text" : "password"}
            {...register("confirmPassword")}
            className="form-control"
            id="exampleInputEmail1"
            placeholder="confirm password"
          ></input>
          <i
            style={{ cursor: "pointer" }}
            onClick={showHandler2}
            className="fas fa-eye"
          ></i>
        </div>
        <div class="form-group mb-2">
          <input
            type="submit"
            className="btn btn-danger"
            value="Add  Doctor"
          ></input>
        </div>
      </form>
    </div>
  );
};

export default AddDoctor;
