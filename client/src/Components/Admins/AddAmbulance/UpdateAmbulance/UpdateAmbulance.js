import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};
Modal.setAppElement("#root");

const UpdateAmbulance = ({ modalIsOpen, closeModal, value }) => {
  //   console.log(value); :id /
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const updateData = {
      driverInfo: {
        contactNumber: [data.Registration],
      },
      name: "",
    };
  };
  return (
    <div>
      <div className="col-md-12">
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <button
            className="btn btn-danger"
            style={{ marginLeft: "220px" }}
            onClick={closeModal}
          >
            X
          </button>

          <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Registation No
              </label>
              <input
                type="Registration"
                {...register("Registration")}
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Driver Name
              </label>
              <input
                type="email"
                className="form-control"
                {...register("DriverName")}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
            </div>
            <div className="mb-3">
              <label for="exampleInputEmail1" className="form-label">
                Contact No
              </label>
              <input
                type="email"
                className="form-control"
                {...register("contact")}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              ></input>
              <input
                className="form-control mt-3 btn btn-success"
                type="submit"
              ></input>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default UpdateAmbulance;
