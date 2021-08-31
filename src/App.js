import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admins/Admin/Admin";
import Doctor from "./Components/Doctors/Doctor/Doctor";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import PatientPanel from "./Components/PateintPanel/PatientPanel/PatientPanel";
import {
  checkUserLoginAction,
  loginUserData,
  loginUserFailed,
} from "./redux/Authentication/actions/Action";
import { baseUrl } from "./utils/baseUrl/baseurl";

function App({ checkLogin, loginInfo, loadUserSuccess, loadUserFailed }) {
  useEffect(() => {
    return (async () => {
      const { isLoggedIn, headers } = loginInfo;

      if (isLoggedIn) {
        console.log("hello");
        const data = await axios.get(
          `${baseUrl}/user/get/own/profile`,
          headers
        );
        if (data.status == 202) {
          loadUserSuccess(data.data);
        } else {
          console.log("hello");
          loadUserFailed();
        }
      }
    })();
  }, []);
  // console.log(loginInfo.isLoggedIn);

  return (
    <div>
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <Route path="/login">
            <Login></Login>
          </Route>
          <Route path="/doctor">
            <Doctor></Doctor>
          </Route>
          <Route path="/admin">
            <Admin></Admin>
          </Route>
          <Route path="/patientPanel">
            <PatientPanel></PatientPanel>
          </Route>
          <Route path="/signup">
            <Signup></Signup>
          </Route>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    loginInfo: state.login,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    checkLogin: () => dispatch(checkUserLoginAction()),
    loadUserSuccess: (data) => dispatch(loginUserData(data)),
    loadUserFailed: () => dispatch(loginUserFailed()),
  };
};

// export default App;
export default connect(mapStateToProps, mapDispatchToProps)(App);
