import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PatientAppointments from "../PatientAppointments/PatientAppointments";
import PatientNav from "../PatientNav/PatientNav";
import Prescription from "../Prescription/Prescription";

const PatientPanel = () => {
  return (
    <div>
      <Router>
        <div className="d-flex">
          <div
            style={{ height: "300vh" }}
            className="col-md-2 text-center bg-danger bg-gradient p-2"
          >
            <PatientNav></PatientNav>
          </div>
          <div className="col-md-10">
            <Switch>
              <Route path="/patientAppointments">
                <PatientAppointments></PatientAppointments>
              </Route>
              <Route path="/prescription">
                <Prescription></Prescription>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default PatientPanel;
