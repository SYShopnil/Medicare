import axios from "axios";
import { useForm } from "react-hook-form";
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import "./AddBlood.css";

const AddBlood = () => {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data, e) => {
    const bloodData = {
      stockInfo: {
        bloodGroup: data.bloodGroup,
        availableAmount: data.amount,
      },
    };
    const response = await axios.post(
      `${baseUrl}/bloodBankService/create`,
      bloodData
    );

    console.log(response);
    e.target.reset();
  };
  return (
    <div>
      <div id="title" className="bg-danger w-50 mt-5">
        <h1 className="text-center text-light">Blood Bank</h1>
      </div>
      <div className="col-md-6" id="title">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("bloodGroup")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Blood group"
            ></input>
          </div>
          <div class="form-group mb-2">
            <input
              type="text"
              className="form-control"
              {...register("amount")}
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Amount"
            ></input>
          </div>
          <button class="btn btn-success">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default AddBlood;
<h1>blood bank</h1>;
