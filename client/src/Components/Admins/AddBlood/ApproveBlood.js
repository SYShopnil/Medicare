import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl.js";

function ApproveBlood() {
  const header = useSelector((state) => state.login.headers);
  const [isChange, setIsChange] = useState(false)
  const [unApprovalBlood, setUnApprovalBlood] = useState([]);
  
  //approve handler 
  const approveHandler =  async(e, data) => {
    e.preventDefault();
    const amount = data.requestInfo.amount
    const group =  data.requestInfo.bloodGroup
    const id = data._id
    const body = {
        amount,
        group
    }
    console.log(body);
    const approveRequest = await axios.post(`${baseUrl}/bloodBankService/approve/request/${id}`,body,header)
    if (approveRequest.status == 202) {
      setIsChange(!isChange)
    }
    alert(approveRequest.data.message)
  }

  //get all up approval request
  useEffect(() => {
    return (async () => {
      const approvalBlood = await axios.get(
        `${baseUrl}/bloodBankService/get/unApproved/request`, //api needed
        header
      );
      //   console.log("hello bura");
      console.log("approval data", approvalBlood.data.data);
      setUnApprovalBlood(approvalBlood.data.data);
      //   setUnApprovalBlood(approvalBlood);
    })();
  }, [isChange]);
  return (
    <div>
      <h1 className="bg-warning text-center text-light">
        Request of Blood Bank
      </h1>

      <div>
        {unApprovalBlood.length === 0 ? (
          <h2 className = {` mt-4  p-3 bg-dark text-center text-light`} >No New request</h2>
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
                <th scope="col">Blood Group</th>
                <th scope="col">amount</th>
              </thead>
              <tbody>
                {unApprovalBlood.map((value, i) => (
                  <tr className="text-light text-center p-2">
                    <td>{i + 1}</td>
                    <td>{value.requestUseInfo.name}</td>
                    <td>{value.requestUseInfo.contactInfo.email}</td>
                    <td>{value.requestUseInfo.contactInfo.contactNumber}</td>
                    <td>{value.requestInfo.bloodGroup}</td>
                    <td>{value.requestInfo.amount}</td>
                    <td>
                      <button className="btn btn-danger" onClick = {(e) => approveHandler(e, value )}>Approve</button>
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

export default ApproveBlood;
