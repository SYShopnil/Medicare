import React from "react";
import Navbar from "../Home/Navber/Navber";

const AmbulanceService = () => {
  // const { register, handleSubmit } = useForm();
  // const onSubmit = async (data, e) => {};

  return (
    <div>
      <Navbar />
      <h1
        style={{ width: "50%", margin: "10px auto" }}
        className="text-center bg-warning mt-3  text-light p-5 "
      >
        Ambulance service
      </h1>
      <form className="col-md-6" action="">
        {/* firstname field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="Your Name"
          ></input>
        </div>
        {/* email field  */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="your email"
          ></input>
        </div>
        {/* contact field   */}
        <div class="form-group mb-2">
          <input
            type="text"
            className="form-control"
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="your contact number"
          ></input>
        </div>
        {/* blood group  field   */}
        <div class="form-group mb-2">
          <textarea
            type="text"
            className="form-control"
            // {...register("_id")}
            id="exampleInputEmail1"
            placeholder="your address"
          ></textarea>
        </div>

        <input type="submit" className="btn btn-danger text-light"></input>
      </form>
    </div>
  );
};

export default AmbulanceService;
