import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

const Oxygen = ({ isChange }) => {
  const header = useSelector((state) => state.login.headers);
  const [amount, setAmount] = useState(false);
  console.log(isChange);

  useEffect(() => {
    return (async () => {
      var getAllData = await axios.get(
        `${baseUrl}/oxygenCylinder/get/all`,
        header
      );
      if (getAllData.status == 202) {
        console.log(getAllData.data);
        setAmount(getAllData.data.data);
      } else {
        setAmount(false);
      }
    })();
  }, [isChange]);
  console.log(amount);
  return (
    <div>
      {!amount ? (
        <h1 className="bg-danger p-3 text-white ">
          No oxygen service has been found
        </h1>
      ) : (
        <h1 className="bg-danger p-3 text-white ">
          {amount[0].amount} Litre Available
        </h1>
      )}
    </div>
  );
};

export default Oxygen;
