import axios from "axios";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl/baseurl";
import UpdateAmbulance from "../UpdateAmbulance/UpdateAmbulance";

const AllAmbulance = ({ isChange, setIsChange , header}) => {
  const [ambulances, setAmbulance] = useState([]);
  const [value, setValue] = useState("");
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isClicked, setIsClicked] = React.useState(false);

  // ambulance service delete handler
  const ambulanceServiceDeleteHandler = async(e, _id) => {
    console.log(_id);
    const sentDeleteReq = await axios.put(`${baseUrl}/ambulanceService/delete/temporary/${_id}`, {}, header)
    if (sentDeleteReq.status == 202) {
      setIsChange(!isChange) //rerender the get all ambulance service part
    }
  }
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
    setValue(ambulance);
    setIsOpen(true);
    setIsClicked(true)
  }
  function closeModal(setFormData, initialState) {
    setIsOpen(false);
    setFormData(initialState)

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
            <tr  key = {i} className="text-center text-white p-2">
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
                <span className="btn btn-danger"  onClick={(e) => ambulanceServiceDeleteHandler(e, ambulance._id )}>Delete</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        modalIsOpen 
        &&
        <UpdateAmbulance
          value={value}
          setIsChange = {isClicked}
          openModal={modalIsOpen}
          setOpenModal={setIsOpen}
          closeModal={closeModal}
          setIsChange={setIsChange}
          isChange = {isChange}
        ></UpdateAmbulance>
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    header: state.login.headers
  }
}


export default connect(mapStateToProps)(AllAmbulance);
