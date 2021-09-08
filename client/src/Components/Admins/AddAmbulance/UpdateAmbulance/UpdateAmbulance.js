import { useEffect, useState } from "react";
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

const UpdateAmbulance = ({
  modalIsOpen,
  closeModal,
  updateButtonClicked,
  setUpdateButtonClicked,
  value,
}) => {
  const [formData, setFormdata] = useState({
    contactNumber: "",
    // value.driverInfo.contactNumber,
    registrationNo: "",
    // value.ambulanceInfo.registrationNo,
    driverName: "",
    // value.driverInfo.name,
  });
  // console.log(formData);
  const [isLoading, setIsLoading] = useState(true);

  console.log(updateButtonClicked);
  // console.log(value);
  const { register, handleSubmit } = useForm();
  useEffect(() => {
    if (updateButtonClicked) {
      console.log("from update button");
      setFormdata({
        contactNumber: value.driverInfo.contactNumber,
        registrationNo: value.ambulanceInfo.registrationNo,
        driverName: value.driverInfo.name,
      });
      setUpdateButtonClicked(false);
      setIsLoading(false);
    }
  }, [updateButtonClicked]);
  const onSubmit = async (data, e) => {
    const updateData = {
      driverInfo: {
        contactNumber: [data.Registration],
        name: data.DriverName,
      },

      ambulanceInfo: {
        registrationNo: data.Registration,
      },
    };
    console.log(updateData);
  };
  return (
    <div>
      <div className="col-md-12">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
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
            {console.log(formData)}
            <form className="col-md-12" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">
                  Registation No
                </label>
                <input
                  type="text"
                  // onChange={(e) =>
                  //   setFormdata({
                  //     ...formData,
                  //     registrationNo: e.target.value,
                  //   })
                  // }
                  value={formData.registrationNo}
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
                  type="text"
                  value={formData.driverName}
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
                  type="text"
                  value={formData.contactNumber}
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
        )}
      </div>
    </div>
  );
};

export default UpdateAmbulance;
