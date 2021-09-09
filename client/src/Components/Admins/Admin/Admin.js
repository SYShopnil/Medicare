import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useRouteMatch,
} from "react-router-dom";
import Navbar from "../../Home/Navber/Navber";
import NotFound from "../../NotFound/NotFound";
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
  const { path, url } = useRouteMatch();
  console.log(path);
  return (
    <div>
      <Navbar />
      <Router>
        <div className="d-flex">
          <div className="col-md-2 bg p-2">
            <Route path={`${path}`}>
              <AdminNav pathUrl={url}></AdminNav>
            </Route>
          </div>
          <div className="col-md-10">
            <Switch>
              <Route exact path={`${path}`}>
                <AddAdmin></AddAdmin>
              </Route>
              <Route exact path={`${path}/addAdmin`}>
                <AddAdmin></AddAdmin>
              </Route>
              <Route exact path={`${path}/addDoctor`}>
                <AddDoctor></AddDoctor>
              </Route>
              <Route exact path={`${path}/patients`}>
                <Patients></Patients>
              </Route>
              <Route exact path={`${path}/doctors`}>
                <Doctors></Doctors>
              </Route>
              <Route path={`${path}/addAmbulance`}>
                <AddAmbulance></AddAmbulance>
              </Route>
              <Route exact path={`${path}/addBlood`}>
                <AddBlood></AddBlood>
              </Route>
              <Route exact path={`${path}/addOxygen`}>
                <AddOxygen></AddOxygen>
              </Route>
              <Route exact path="*" component={NotFound} />
            </Switch>
          </div>
        </div>
      </Router>
    </div>
  );
};

export default Admin;
