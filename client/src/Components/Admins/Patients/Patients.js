import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

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
      const getAllDoctor = await axios.get(`${baseUrl}/doctor/get/all`, header);
      // console.log(getAllDoctor.data.data);
      setIsChange(!Ischange);
      setPatients(getAllDoctor.data.data);
    })();
  }, []);
  // console.log(doctors);
  console.log(value);
  return (
    <div>
      <h1 className="text-center mt-5 bg-warning text-light">Doctors</h1>
      <div className="table">
        <table className="table table-bordered bg-dark table-striped p-3">
          <thead
            style={{ fontSize: "20px" }}
            className="text-center text-warning p-2"
          >
            <th scope="col">No</th>
            <th scope="col">Doctor Name</th>
            <th scope="col">Doctor Id</th>
            <th scope="col">Category</th>
            <th scope="col">Contact</th>
            <th>action</th>
          </thead>
          <tbody>
            {patients.map((patient, i) => (
              <tr className="text-center text-white">
                <td>{i + 1}</td>
                {/* <td>
                  {doctor.personalInfo.firstName +
                    " " +
                    doctor.personalInfo.lastName}
                </td>
                <td>{doctor.userId}</td>
                <td>{doctor.officialInfo.category[0]}</td>
                <td>{doctor.personalInfo.contact.email}</td> */}
                <td>
                  <span
                    onClick={() => {
                      openModal(patient._id);
                    }}
                    className="btn btn-success me-2"
                  >
                    Update
                  </span>
                  <span className="btn btn-danger">Delete</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* <UpdateDoctor
        value={value}
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      /> */}
    </div>
  );
};

export default Patients;
