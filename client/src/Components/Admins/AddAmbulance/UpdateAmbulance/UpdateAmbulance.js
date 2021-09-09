import axios from "axios";
import React, { useState } from "react";
import { connect } from "react-redux";
import { baseUrl } from "../../../../utils/baseUrl/baseurl";
import modelStyleSheet from "../../../../utils/modalCss/modal.module.css";

const UpdateAmbulance = ({
  openModal,
  setOpenModal,
  value,
  header,
  setIsChange,
  isChange,
}) => {
  const [formData, setFormdata] = useState({
    contactNumber: value.driverInfo.contactNumber[0],
    registrationNo: value.ambulanceInfo.registrationNo,
    driverName: value.driverInfo.name,
  });

  //update form submit handlers
  const submitHandler = async (e) => {
    e.preventDefault();
    const body = {
      ...value,
      driverInfo: {
        contactNumber: [formData.contactNumber],
        name: formData.driverName,
      },
      ambulanceInfo: {
        registrationNo: formData.registrationNo,
      },
    };
    const { _id } = value;
    const responseOfUpdate = await axios.put(
      `${baseUrl}/ambulanceService/update/${_id}`,
      body,
      header
    ); //request for update
    if (responseOfUpdate.status == 202) {
      setOpenModal(false);
      setIsChange(!isChange);
    }
  };
  return (
    <div className={`${modelStyleSheet.wrap}`}>
      <div tabindex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update AmbulanceService</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  setOpenModal(false);
                }}
              ></button>
            </div>
            <div className="modal-body">
              <form className="col-md-12">
                {/* registration no */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Registation No
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormdata({
                        ...formData,
                        registrationNo: e.target.value,
                      })
                    }
                    className="form-control"
                    id="exampleInputEmail1"
                    value={formData.registrationNo}
                    aria-describedby="emailHelp"
                  ></input>
                </div>

                {/* driver name */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Driver Name
                  </label>
                  <input
                    onChange={(e) =>
                      setFormdata({ ...formData, driverName: e.target.value })
                    }
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={formData.driverName}
                    aria-describedby="emailHelp"
                  ></input>
                </div>

                {/* contact no */}
                <div className="mb-3">
                  <label for="exampleInputEmail1" className="form-label">
                    Contact No
                  </label>
                  <input
                    type="text"
                    onChange={(e) =>
                      setFormdata({
                        ...formData,
                        contactNumber: e.target.value,
                      })
                    }
                    value={formData.contactNumber}
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                  ></input>
                  <button
                    className="form-control mt-3 btn btn-primary"
                    onClick={(e) => submitHandler(e)}
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
            {/* <div class="modal-footer">
                      <button 
                      type="button" 
                      class="btn btn-secondary" 
                      data-bs-dismiss="modal"
                      onClick = {(e) => {setOpenModal(false)}}>Close</button>
                    </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    header: state.login.headers,
  };
};

export default connect(mapStateToProps)(UpdateAmbulance);
