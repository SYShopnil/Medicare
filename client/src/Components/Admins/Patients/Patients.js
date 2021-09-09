import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import Allappointments from "./Allappointments";

const Patients = () => {
  const header = useSelector((state) => state.login.headers);
  const [Ischange, setIsChange] = useState(false);
  const [patients, setPatients] = useState([]); //set doctors
  const [value, setValue] = useState(""); //set doctor id of state
  const [modalIsOpen, setIsOpen] = React.useState(false); //modal state
  function openModal(id) {
    console.log(id);
    setValue(id);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    return (async () => {
      const getAllPatient = await axios.get(
        `${baseUrl}/patient/get/all`,
        header
      );
      // console.log(getAllPatient.data.data);
      setIsChange(!Ischange);
      setPatients(getAllPatient.data.data);
    })();
  }, []);
  // console.log(pateints);
  // console.log(value);
  return (
    <div>
      <h1 className="text-center mt-5 bg-warning text-white">Patient User</h1>
      <div className="table">
        <table className="table table-bordered bg-dark table-striped p-3">
          <thead
            style={{ fontSize: "20px" }}
            className="text-center text-warning p-2"
          >
            <th scope="col">No</th>
            <th scope="col">Patient Name</th>
            <th scope="col">User Id</th>
            <th scope="col">Contact</th>
            <th scope="col">Details</th>
            {/* <th>action</th> */}
          </thead>
          <tbody>
            {patients.map((patient, i) => (
              <tr className="text-center text-white">
                <td>{i + 1}</td>
                <td>
                  {patient.personalInfo.firstName +
                    " " +
                    patient.personalInfo.lastName}
                </td>
                <td>{patient.userId}</td>
                <td>{patient.personalInfo.contact.email}</td>
                <td>
                  <button className="btn btn-danger">Details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <h1 className="text-center bg-danger">Appointments</h1> */}
      <Allappointments></Allappointments>
    </div>
  );
};

export default Patients;
