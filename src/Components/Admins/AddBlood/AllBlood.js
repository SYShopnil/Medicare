import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

const AllBlood = ({ isChange }) => {
  const [blood, setBlood] = useState([]);

  const header = useSelector((state) => state.login.headers);
  console.log(header);

  const deleteHandler = async (e, id) => {
    console.log(id);
    const deleteBlood = await axios.put(
      `${baseUrl}/bloodBankService/delete/temporary/:${id}`,
      header
    );
    console.log(deleteBlood);
  };
  useEffect(() => {
    return (async () => {
      const allBloods = await axios.get(
        `${baseUrl}/bloodBankService/get/all`,
        header
      );
      setBlood(allBloods.data.data);
    })();
  }, [isChange]);
  console.log(blood);

  return (
    <div className="col-md-11 ms-5">
      <table className="table table-bordered bg-dark  table-striped p-3">
        <thead
          style={{ fontSize: "20px" }}
          className="text-center text-warning p-2"
        >
          <th scope="col">No</th>
          <th scope="col">Blood Group</th>
          <th scope="col">Amount</th>
          <th scope="col">Action</th>
        </thead>
        <tbody>
          {blood.map((b, i) => (
            <tr className="text-center text-white p-2">
              <td>{i + 1}</td>
              <td>{b.stockInfo.bloodGroup}</td>
              <td>{b.stockInfo.availableAmount}</td>
              <td>
                <span className="btn btn-success me-2">Update</span>
                <span
                  onClick={(e) => deleteHandler(e, b._id)}
                  className="btn btn-danger"
                >
                  Delete
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllBlood;
