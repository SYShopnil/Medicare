import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl.js";

const Allappointments = () => {
  const header = useSelector((state) => state.login.headers);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    return (async () => {
      const allAppointments = await axios.get(
        `${baseUrl}/appointment/get/all`,
        header
      );
      //   console.log(allAppointments);
      setAppointments(allAppointments.data.data);
    })();
  },[]);
  console.log(appointments);
  return (
    <div>
      <h1 className="text-center bg-danger mt-5 text-light">Appointments</h1>
      <table className="table table-bordered bg-dark table-striped p-3">
        <thead
          style={{ fontSize: "20px" }}
          className="text-center text-warning p-2"
        >
          <th scope="col">No</th>
          <th scope="col">Patient Name</th>
          <th scope="col">Appointment Id</th>
          <th scope="col">Patient Age</th>
          <th scope="col">Doctor</th>
          <th scope="col">User Name</th>
          <th scope="col">Appointment Date</th>
          {/* <th>action</th> */}
        </thead>
        <tbody>
          {
            appointments.length != 0
            &&
            <>
              {appointments.map((appointments, i) => (
                <tr className="text-light text-center">
                   <td>{i + 1}</td>
                  <td>{appointments.patientDetails.name}</td>
                  <td>{appointments.appointmentDetails.appointmentId}</td>
                 <td>{appointments.patientDetails.age}</td>
                  <td>
                    {appointments.appointmentDetails.doctorDetails.personalInfo
                      .firstName +
                      " " +
                      appointments.appointmentDetails.doctorDetails.personalInfo
                        .lastName}
                  </td>
                   <td>
                    {appointments.appointmentRequestUser.personalInfo.firstName +
                      " " +
                      appointments.appointmentRequestUser.personalInfo.lastName}
                  </td>
                  <td>{appointments.appointmentDetails.appointmentDate}</td>
                  <td>
                    <button className="btn btn-danger">Details</button>
                  </td> 
                </tr>
              ))}
            </>
          }
        </tbody>
      </table>
    </div>
  );
};

export default Allappointments;
