import React from "react";
import { useForm } from "react-hook-form";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import LoginImage from "../../images/login.jpg";
import { loginProcess } from "../../redux/Authentication/actions/Action";
import Navbar from "../Home/Navber/Navber";

const Login = ({ login, loginDispatch }) => {
  const { register, handleSubmit } = useForm();
  let history = useHistory();
  const useSignUp = () => {
    history.push("/signup");
  };
  console.log(login);
  const onSubmit = async (data, e) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };
    loginDispatch(loginData);
    console.log(loginData);
    e.target.reset();
    history.push("/");
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="row">
        <div className="col-md-5 p-5">
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ marginTop: "50px" }}
            action="
                "
          >
            <h2 className="text-light bg-primary mb-3 p-2 text-center">
              Login
            </h2>
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

            {/* password field  */}
            <div className="mb-3">
              <input
                {...register("password")}
                placeholder="your password"
                type="password"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>
            {/* login button  */}
            <button className="btn btn-outline-primary">login</button>
          </form>
          {/* <Link>
          <p>Forget your Password?</p>
        </Link> */}

          <p
            className="text-danger mt-2"
            style={{ cursor: "pointer", textDecoration: "underline" }}
            onClick={useSignUp}
          >
            Not out user? please sign up
          </p>
        </div>
        <div className="col-md-7">
          <img
            style={{ width: "100%", height: "100%" }}
            src={LoginImage}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginDispatch: (formData) => dispatch(loginProcess(formData)),
  };
};
// export default Login;
export default connect(mapStateToProps, mapDispatchToProps)(Login);
