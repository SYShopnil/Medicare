import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl/baseurl";

const UpdateBlood = ({
  data,
  showModal,
  setShowModal,
  setIsChange,
  isChange,
}) => {
  const [formData, setFormData] = useState({
    bloodGroup: data.stockInfo.bloodGroup,
    availableAmount: data.stockInfo.availableAmount,
  });
  const [updating, setUpdating] = useState(false);
  const [updateProcess, setUpdateProcess] = useState({
    status: false,
    message: "",
  });
  const header = useSelector((state) => state.login.headers);
  // updateHandler
  const updateHandler = (e) => {
    e.preventDefault();
    setUpdating(true);
  };

  //controlled the updating part
  useEffect(() => {
    return (async () => {
      if (updating) {
        //if the updating phase starts then it will execute
        try {
          const sendDataFormat = {
            //create the format of send data
            ...data,
            stockInfo: formData,
          };
          const response = await axios.put(
            `${baseUrl}/bloodBankService/update/${data._id}`,
            sendDataFormat,
            header
          ); //sent the axios request
          if (response.status == 202) {
            setUpdating(false);
            setUpdateProcess({
              status: false,
              message: "Service Updated Successfully ",
            });
            setIsChange(!isChange);
            setShowModal(false);
          } else {
            setUpdating(false);
            setUpdateProcess({
              status: false,
              message: "Update Failed",
            });
          }
        } catch (e) {
          //if there have any error
          setUpdating(false);
          setUpdateProcess({
            status: false,
            message: "Update Failed",
          });
        }
      }
    })();
  }, [updating]);
  return (
    <>
      <div
        className=""
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-dark" id="exampleModalLabel">
                Update Blood Bank
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => setShowModal(false)}
                disabled={updating && true}
              ></button>
            </div>
            <div className="modal-body">
              {/* blood group name */}
              <div class="mb-3">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-dark text-start d-block"
                >
                  Blood Group Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Group Name"
                  value={`${formData.bloodGroup}`}
                  name={`bloodGroup`}
                />
              </div>
              {/* blood amount  */}
              <div class="mb-3">
                <label
                  for="exampleFormControlInput1"
                  class="form-label text-dark text-start d-block"
                >
                  Amount
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Amount"
                  value={`${formData.availableAmount}`}
                  name={`availableAmount`}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      availableAmount: e.target.value,
                    })
                  }
                />
              </div>
            </div>
            <div className="modal-footer">
              {/* close button */}
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={(e) => setShowModal(false)}
                disabled={updating && true}
              >
                Close
              </button>

              {/* update button */}
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => updateHandler(e)}
              >
                {" "}
                {updating ? "Updating..." : "Update"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default UpdateBlood;
