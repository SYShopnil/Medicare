import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

export default function ApproveOxygen() {
  const [unApprovalData, setunApprovalData] = useState([]);
  const header = useSelector((state) => state.login.headers);
  console.log({ unApprovalData });
  useEffect(() => {
    return (async () => {
      const approvalData = await axios.get(
        `${baseUrl}/oxygenCylinder/get/all/unApproved/request`,
        header
      );
      // console.log({approvalData});
      setunApprovalData(approvalData.data.data);
    })();
  }, []);
  return (
    <div>
      {unApprovalData.length === 0 ? (
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
              <th scope="col">Amount</th>
            </thead>
            <tbody>
              {unApprovalData.map((value, i) => (
                <tr className="text-light text-center p-2">
                  <td>{i + 1}</td>
                  <td>{value.requestUseInfo.name}</td>
                  <td>{value.requestUseInfo.contactInfo.email}</td>
                  <td>{value.requestUseInfo.contactInfo.contactNumber}</td>
                  <td>{value.requestInfo.amount}</td>
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
  );
}
