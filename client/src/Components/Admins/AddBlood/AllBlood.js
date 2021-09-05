import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import UpdateBlood from "./UpdateBlood/UpdateBlood";

const AllBlood = ({ isChange, setIsChange}) => {
  const [blood, setBlood] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentData, setCurrentData] = useState({})
  const header = useSelector((state) => state.login.headers);
  const [deleteStatus, setDeleteStatus] = useState({
    status: false,
    message: ""
  })
  console.log(header);

  //delete handler
  const deleteHandler = async (e, id) => {
    // console.log(id);
    const deleteBlood = await axios.put(`${baseUrl}/bloodBankService/delete/temporary/${id}`, {},header);
    if(deleteBlood.status == 202) {
      setIsChange(!isChange)
      setDeleteStatus({
        status: true,
        message: "Blood Group Successfully Deleted"
      })
    }else {
      setIsChange(!isChange)
      setDeleteStatus({
        status: false,
        message: "Blood group unable to delete please try again later."
       })
    }
  };
  // updateHandler
  const updateHandler = (e, data) => {
    e.preventDefault();
    setShowModal(true)
    setCurrentData(data)
  } 
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
      {
        showModal 
        ?
        <div>
          <UpdateBlood 
          showModal = {showModal} 
          data = {currentData} 
          setShowModal = {setShowModal} 
          setIsChange = {setIsChange} 
          isChange = {isChange}/>
        </div>
        :
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
                  {/* // <!-- Button trigger modal --> */}
                  <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick = {(e) => updateHandler(e, b)}>
                  Update
                  </button>

                  {/* delete button */}
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
      }
     
    </div>
  );
};

export default AllBlood;
