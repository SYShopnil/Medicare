import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../utils/baseUrl/baseurl";
import UpdateAmbulance from "../UpdateAmbulance/UpdateAmbulance";

const AllAmbulance = ({ isChange, setIsChange }) => {
  const [ambulances, setAmbulance] = useState([]);
  const [value, setValue] = useState("");
  const [updateButtonClicked, setUpdateButtonClicked] = useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    return (async () => {
      const allAmbulance = await axios.get(
        `${baseUrl}/ambulanceService/get/all`
      );
      //   console.log(allAmbulance.data.data);
      setAmbulance(allAmbulance.data.data);
    })();
  }, [isChange]);
  // console.log(ambulances);
  function openModal(ambulance) {
    // console.log(ambulance);
    setValue(ambulance);
    setUpdateButtonClicked(true);
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setUpdateButtonClicked(false);
  }
  return (
    <div>
      <table className="table table-bordered bg-dark table-striped p-3">
        <thead
          style={{ fontSize: "20px" }}
          className="text-center text-warning p-2"
        >
          <th scope="col">No</th>
          <th scope="col">Registration No</th>
          <th scope="col">Driver Name</th>
          <th scope="col">Action</th>
        </thead>
        <tbody className="">
          {ambulances.map((ambulance, i) => (
            <tr className="text-center text-white p-2">
              <td>{i + 1}</td>
              <td>{ambulance.ambulanceInfo.registrationNo}</td>
              <td>{ambulance.driverInfo.name}</td>
              <td>{ambulance.driverInfo.contactNumber[0]}</td>
              <td>
                <span
                  onClick={() => {
                    openModal(ambulance);
                  }}
                  className="btn btn-primary me-2"
                >
                  update
                </span>
                <span className="btn btn-danger">Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <UpdateAmbulance
        value={value}
        updateButtonClicked={updateButtonClicked}
        setUpdateButtonClicked={setUpdateButtonClicked}
        openModal={openModal}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      ></UpdateAmbulance>
    </div>
  );
};

export default AllAmbulance;
