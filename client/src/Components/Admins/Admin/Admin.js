import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AddAdmin from "../AddAdmin/AddAdmin";
import AddAmbulance from "../AddAmbulance/AddAmbulance";
import AddBlood from "../AddBlood/AddBlood";
import AddDoctor from "../AddDoctor/AddDoctor";
import AddOxygen from "../AddOxygen/AddOxygen";
import AdminNav from "../AdminNav/AdminNav";
import Doctors from "../Doctors/Doctors";
import Patients from "../Patients/Patients";
import "./Admin.css";

const Admin = () => {
  return (
    <div>
      <Router>
        <div className="d-flex">
          <div className="col-md-2 bg p-2">
            <AdminNav></AdminNav>
          </div>
          <div className="col-md-10">
            <Switch>
              <Route path="/addAdmin">
                <AddAdmin></AddAdmin>
              </Route>
              <Route path="/addDoctor">
                <AddDoctor></AddDoctor>
              </Route>
              <Route path="/patients">
                <Patients></Patients>
              </Route>
              <Route path="/doctors">
                <Doctors></Doctors>
              </Route>
              <Route path="/addAmbulance">
                <AddAmbulance></AddAmbulance>
              </Route>
              <Route path="/addBlood">
                <AddBlood></AddBlood>
              </Route>
              <Route path="/addOxygen">
                <AddOxygen></AddOxygen>
              </Route>
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Admin;
