import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

export default function ApproveOxygen() {
  const [unApprovalData, setunApprovalData] = useState([]);
  const header = useSelector((state) => state.login.headers);

  useEffect(() => {
    return (async () => {
      const approvalData = await axios.get(
        `${baseUrl}/oxygenCylinder/get/all/unApproved/request`,
        header
      );
      console.log(approvalData.data.data);
      setunApprovalData(approvalData.data.data);
    })();
  }, []);
  return (
    <div>
      {unApprovalData.length === 0 ? (
        <h2>no new request</h2>
      ) : (
        <>
          {unApprovalData.map((value) => {
            return <button>Approve</button>;
          })}
        </>
      )}
    </div>
  );
}
