import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DoctorNav from "../DoctorNav/DoctorNav";
import Prescription from "../Prescription/Prescription";
import YourAppoinment from "../YourAppoinment/YourAppoinment";

const Doctor = () => {
  return (
    <Router>
      <div className="d-flex">
        <div className="col-md-2 bg-info p-2">
          <DoctorNav></DoctorNav>
        </div>
        <div className="col-md-10">
          <Switch>
            <Route path="/yourAppointment">
              <YourAppoinment></YourAppoinment>
            </Route>
            <Route path="/prescription">
              <Prescription></Prescription>
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default Doctor;
