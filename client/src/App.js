import axios from "axios";
import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Admin from "./Components/Admins/Admin/Admin";
import Appoinments from "./Components/Appoinments/Appoinments";
import ShowDoctorByCategory from "./Components/Appoinments/ShowDoctorByCategory";
import Doctor from "./Components/Doctors/Doctor/Doctor";
import Home from "./Components/Home/Home/Home";
import Login from "./Components/Login/Login";
import Signup from "./Components/Login/Signup";
import NotFound from "./Components/NotFound/NotFound";
import PatientPanel from "./Components/PateintPanel/PatientPanel/PatientPanel";
import AmbulanceService from "./Components/Services/AmbulanceService";
import BloodBankService from "./Components/Services/BloodBankService";
import OxygenService from "./Components/Services/OxygenService";
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
          <Route exact path="/home">
            <Home></Home>
          </Route>
           <Route exact path = "/doctor/show" component = {ShowDoctorByCategory}/>
          <Route exact path="/login">
            <Login></Login>
          </Route>
          <Route  path="/doctor">
            <Doctor></Doctor>
          </Route>
          <Route  path="/admin">
            <Admin></Admin>
          </Route>
          <Route exact path="/patientPanel">
            <PatientPanel></PatientPanel>
          </Route>
          <Route exact path="/signup">
            <Signup></Signup>
          </Route>
          <Route exact path="/appoinments">
            <Appoinments></Appoinments>
          </Route>
          <Route exact path="/bloodBank">
            <BloodBankService></BloodBankService>
          </Route>
          <Route exact path="/ambulanceService">
            <AmbulanceService></AmbulanceService>
          </Route>
          <Route exact path="/oxygenService">
            <OxygenService></OxygenService>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route exact path="*">
            <NotFound></NotFound>
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
