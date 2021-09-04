import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

const Oxygen = ({ isChange }) => {
  const [amount, setAmount] = useState({});
  console.log(isChange);

  useEffect(() => {
    return (async () => {
      var getAllData = await axios.get(`${baseUrl}/oxygenCylinder/get/all`);
      console.log(getAllData.data);
      setAmount(getAllData.data.data);
    })();
  }, [isChange]);

  const allAmount = amount.amount;
  return (
    <div>
      <h1 className="bg-danger p-3 text-white ">{allAmount} Litre Available</h1>
    </div>
  );
};

export default Oxygen;
