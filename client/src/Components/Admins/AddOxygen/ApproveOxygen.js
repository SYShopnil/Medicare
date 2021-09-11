import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

export default function ApproveOxygen() {
  const [unApprovalData, setunApprovalData] = useState([]);
  const header = useSelector((state) => state.login.headers);
  const [isChange, setIsChange] = useState(false);

  //approve handler for oxygen service
  const approveHandler = async (e, data) => {
    e.preventDefault();
    const amount = data.requestInfo.amount;
    const cylinderId = data.requestInfo.cylinderId;
    const body = {
      amount,
      cylinderId,
    };
    const id = data._id;
    const approveReq = await axios.post(
      `${baseUrl}/oxygenCylinder/request/approve/${id}`,
      body,
      header
    );
    if (approveReq.status == 202) {
      setIsChange(!isChange);
    }
    alert(approveReq.data.message);
  };

  //get all un approve oxygen request
  useEffect(() => {
    return (async () => {
      const approvalData = await axios.get(
        `${baseUrl}/oxygenCylinder/get/all/unApproved/request`,
        header
      );
      // console.log({approvalData});
      setunApprovalData(approvalData.data.data);
    })();
  }, [isChange]);
  return (
    <div>
      <h1 className="bg-dark mt-4 p-3 text-center text-light">
        Request of Oxygen Service
      </h1>
      {unApprovalData.length === 0 ? (
        <h2 className={`p-3 bg-danger text-center text-light`}>
          No new request
        </h2>
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
              <th scope="col">Approval Status</th>
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
                    <button
                      className="btn btn-danger"
                      onClick={(e) => approveHandler(e, value)}
                    >
                      Approve
                    </button>
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
