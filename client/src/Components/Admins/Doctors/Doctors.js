import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import UpdateDoctor from "./UpdateDoctor";

const Doctors = () => {
  const header = useSelector((state) => state.login.headers);
  const [Ischange, setIsChange] = useState(false);
  const [doctors, setDoctors] = useState([]); //set doctors
  const [value, setValue] = useState(""); //set doctor id of state
  const [modalIsOpen, setIsOpen] = React.useState(false); //modal state
  function openModal(data) {
    setValue(data);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  // doctor delete handler
  const doctorDeleteHander = async (e, _id) => {
    console.log(_id);
    const sentDeleteResponse = await axios.post(
      `${baseUrl}/doctor/delete/${_id}`,
      {},
      header
    );
    if (sentDeleteResponse.status == 202) {
      setIsChange(!Ischange);
    }
  };
  //to re render the component and get all doctor data
  useEffect(() => {
    return (async () => {
      const getAllDoctor = await axios.get(`${baseUrl}/doctor/get/all`, header);
      setDoctors(getAllDoctor.data.data);
    })();
  }, [Ischange]);
  console.log(`hello`);
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
            {doctors.map((doctor, i) => (
              <tr className="text-center text-white">
                <td>{i + 1}</td>
                <td>
                  {doctor.personalInfo.firstName +
                    " " +
                    doctor.personalInfo.lastName}
                </td>
                <td>{doctor.userId}</td>
                <td>{doctor.officialInfo.category[0]}</td>
                <td>{doctor.personalInfo.contact.email}</td>
                <td>
                  <span
                    onClick={() => {
                      openModal(doctor);
                    }}
                    className="btn btn-success me-2"
                  >
                    Update
                  </span>
                  <span
                    className="btn btn-danger"
                    onClick={(e) => doctorDeleteHander(e, doctor._id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalIsOpen && (
        <UpdateDoctor
          value={value}
          openModal={openModal}
          closeModal={closeModal}
          modalIsOpen={modalIsOpen}
          setIsChange={setIsChange}
          isChange={Ischange}
        />
      )}
    </div>
  );
};

export default Doctors;
