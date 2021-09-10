import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl.js";

function ApproveAmbulance() {
  const [unApproveAmbulance, setUnApproveAmbulance] = useState([]);
  const header = useSelector((state) => state.login.headers);
  useEffect(() => {
    return async () => {
      const approveAmbulance = await axios.get(
        `${baseUrl}/ambulanceService/get/all/unApproved/request`,
        header
      );
      console.log(approveAmbulance.data.data);
      setUnApproveAmbulance(approveAmbulance.data.data);
    };
  });
  return (
    <div>
      <h1>Request of Ambulance Service</h1>
      <div>
        {unApproveAmbulance.length === 0 ? (
          <h2>no new request</h2>
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
                      <button className="btn btn-danger">Approve</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </div>
  );
}

export default ApproveAmbulance;
