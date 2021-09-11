import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl.js";

function ApproveAmbulance() {
  const [unApproveAmbulance, setUnApproveAmbulance] = useState([]);
  const header = useSelector((state) => state.login.headers);
  const [isLoading, setIsLoading] = useState(true)
  const [isChange, setIsChange] = useState(false)

  //request approve handler 
  const approveHandler = async(e, id) => {
    e.preventDefault();
    const sentApproveRequest = await axios.put(`${baseUrl}/ambulanceService/request/approved/${id}`, {}, header)
    if (sentApproveRequest.status == 202) {
      setIsChange(!isChange)
    }
  }

  //to get all un approve request 
  useEffect(() => {
    return (async () => {
      const approveAmbulance = await axios.get(
        `${baseUrl}/ambulanceService/get/all/unApproved/request`,
        header
      );
      console.log(approveAmbulance.data);
      setUnApproveAmbulance(approveAmbulance.data.data);
      setIsLoading(false)
    })();
  }, [isChange]);
  return (
    <div className = {`mt-5`}>
      <h1 className = {`bg-warning text-center text-light`}>Request of Ambulance Service</h1>
      {
        isLoading
        ?
        <h1>Loading...</h1>
        :
        <div>
        {unApproveAmbulance.length === 0 ? (
          <h2 className = {` mt-4  p-3 bg-dark text-center text-light`}>No new request</h2>
        ) : (
          <>
            <table className="table table-bordered bg-dark table-striped p-3">
              <thead
                style={{ fontSize: "20px" }}
                className="text-center text-warning p-2"
              >
                <th scope="col">No</th>
                <th scope="col"> Name</th>
                <th scope="col">Email</th>
                <th scope="col">Contact</th>
                <th scope="col">Address</th>
                <th scope="col">Approval Status</th>
              </thead>
              <tbody>
                {unApproveAmbulance.map((value, i) => (
                  <tr className="text-light text-center p-2">
                    <td>{i + 1}</td>
                    <td>{value.requestUseInfo.name}</td>
                    <td>{value.requestUseInfo.contactInfo.email}</td>
                    <td>{value.requestUseInfo.contactInfo.contactNumber}</td>
                    <td>{value.requestUseInfo.contactInfo.address}</td>
                    <td>
                    <button className="btn btn-danger" onClick = {(e) => approveHandler(e, value._id)}>Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      }
      
    </div>
  );
}

export default ApproveAmbulance;
