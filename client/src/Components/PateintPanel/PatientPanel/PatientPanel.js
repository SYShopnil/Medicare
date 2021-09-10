import React from "react";
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import Appointment from "../../../utils/AppoinmentRoleBase/Appointment";
import Navbar from "../../Home/Navber/Navber";
import PatientAppointments from "../PatientAppointments/PatientAppointments";
import PatientNav from "../PatientNav/PatientNav";
import Prescription from "../Prescription/Prescription";


const PatientPanel = () => {
  const  {path, url} = useRouteMatch() //get the path and url of my root route
  return (
    <div>
      <Navbar />
       <div className="d-flex">
          <div
            style={{ height: "300vh" }}
            className="col-md-2 text-center bg-danger bg-gradient p-2"
          >
            <PatientNav url = {url}></PatientNav>
          </div>
          <div className="col-md-10">
            <Switch>
              <Route exact path= {`${path}/patientAppointments`}>
                <PatientAppointments url = {url} ></PatientAppointments>
              </Route>

              <Route  exact path= {`${path}/patientAppointments/details/:id`}>
                <Appointment></Appointment>
              </Route>
              <Route exact path= {`${path}/prescription`}>
                <Prescription></Prescription>
              </Route>
            </Switch>
          </div>
        </div>
    </div>
  );
};

export default PatientPanel;
