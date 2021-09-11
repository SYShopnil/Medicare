import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { BrowserRouter as Link, useHistory } from "react-router-dom";
import SignupImage from "../../images/signup.jpg";
import { baseUrl } from "../../utils/baseUrl/baseurl";
import ImageUploader from "../../utils/singleImageUploader/ImageUploader";
import Navbar from "../Home/Navber/Navber";
import "./Signup.css";
const Signup = () => {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState("");
  const [image, setImage] = useState({});

  const [show, setShow] = useState({
    show1: false,
    show2: false,
  });
  const fileHandler = (file) => {
    console.log("hello bura");
    console.log(file.size);
    setImage(file);
  };
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

  const onSubmit = async (data, e) => {
    const postUser = {
      personalInfo: {
        firstName: data.firstname,
        lastName: data.lastname,
        contact: {
          email: data.email,
        },
      },
      profileImage: image,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    console.log(postUser);

    const response = await axios.post(`${baseUrl}/patient/create`, postUser);
    const responseMessage = response.data.message;
    console.log(responseMessage);
    console.log(response);
    e.target.reset();
  };
  if (message !== "") {
    alert(message);
    setMessage("");
  }
  // push to  login route
  const history = useHistory();
  const goLogin = () => {
    history.push("/login");
  };
  return (
    <div>
      <Navbar></Navbar>{" "}
      <div className="row">
        <div className="col-md-5 p-5">
          <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "10px" }}>
            <h2 className="text-light bg-success mb-3 p-2 text-center">
              Sign up
            </h2>

            {/* name field  */}
            <div className="mb-3">
              <input
                {...register("firstname")}
                placeholder="firstname"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>
            <div className="mb-3">
              <input
                {...register("lastname")}
                placeholder="lastname"
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>

            {/* email field   */}
            <div className="mb-3">
              <input
                {...register("email")}
                placeholder="your email"
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>
            {/* image field  */}
            <ImageUploader filePassHandler={fileHandler} />
            {/* <div className="mb-3">
          
          </div> */}

            {/* password field  */}
            <div className="mb-3 eye">
              <input
                required
                {...register("password")}
                placeholder="your password"
                type={show.show1 ? "text" : "password"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
              <i
                style={{ cursor: "pointer" }}
                onClick={showHandler1}
                class="fas fa-eye"
              ></i>
            </div>
            <div className="mb-3 eye">
              <input
                required
                {...register("confirmPassword")}
                placeholder="confirm your password"
                type={show.show2 ? "text" : "password"}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
              <i
                style={{ cursor: "pointer" }}
                onClick={showHandler2}
                className="fas fa-eye"
              ></i>
            </div>
            <input
              className="btn btn-outline-success"
              type="submit"
              value="signUp"
            />
          </form>
          {/* login button  */}

          <Link to="/login">
            <p
              className="text-success mt-2"
              style={{ cursor: "pointer", textDecoration: "underline" }}
              onClick={goLogin}
            >
              Our user? please Login
            </p>
          </Link>
        </div>
        <div className="col-md-7">
          <img
            style={{ width: "100%", height: "80%" }}
            src={SignupImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
