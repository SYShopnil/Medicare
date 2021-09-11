import React from "react";
import { BrowserRouter as Router, Route, Switch, useRouteMatch } from "react-router-dom";
import Appointment from "../../../utils/AppoinmentRoleBase/Appointment";
import Navbar from "../../Home/Navber/Navber";
import DoctorNav from "../DoctorNav/DoctorNav";
import CreatePrescription from "../Prescription/CreatePrescription";
import Prescription from "../Prescription/Prescription";
import Update from "../Prescription/Update";
import YourAppoinment from "../YourAppoinment/YourAppoinment";

const Doctor = () => {
  const {url, path} = useRouteMatch()
  return (
   <> 
    <Navbar></Navbar>
      <div className="d-flex">
        <div className="col-md-2 bg-info p-2">
          <DoctorNav url = {url}></DoctorNav>
        </div>
        <div className="col-md-10">
          <Switch>
            <Route exact path= {`${path}/yourAppointment`} >
              <YourAppoinment ></YourAppoinment>
            </Route>

            <Route exact path= {`${path}/yourAppointment/create/new`} >
              <CreatePrescription></CreatePrescription>
            </Route>

            <Route exact path= {`${path}/yourAppointment/update`} >
              <Update></Update>
            </Route>
            
            <Route exact path= {`${path}/yourAppointment/details/:id`} >
              <Appointment/>
            </Route>
            <Route exact path={`${path}/prescription`}>
              <Prescription></Prescription>
            </Route>
          </Switch>
        </div>
      </div>
   </>
  );
};

export default Doctor;
