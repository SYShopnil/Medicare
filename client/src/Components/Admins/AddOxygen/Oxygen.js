import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

const Oxygen = ({ isChange }) => {
  const [amount, setAmount] = useState(false);
  console.log(isChange);

  useEffect(() => {
    return (async () => {
      var getAllData = await axios.get(`${baseUrl}/oxygenCylinder/get/all`);
      if(getAllData.status == 202) {
        console.log(getAllData.data);
        setAmount(getAllData.data.data);
      }else {
        setAmount(false);
      }
    })();
  }, [isChange]);
  console.log(amount)
  return (
    <div>
      {
        !amount 
        ?
        <h1 className="bg-danger p-3 text-white ">No oxygen service has been found</h1>
         :
        <h1 className="bg-danger p-3 text-white ">{amount.amount} Litre Available</h1>
      }
    </div>
  );
};

export default Oxygen;
