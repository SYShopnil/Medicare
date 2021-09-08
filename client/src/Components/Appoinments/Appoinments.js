import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Home/Navber/Navber";

const Appoinments = () => {
  const [appoinment, setAppoinment] = useState([]);

  useEffect(() => {
    return async () => {
      const categoryDoctor = await axios.get(``);
    };
  }, []);
  return (
    <div>
      <Navbar />
      <h1>this is appointments page</h1>
    </div>
  );
};

export default Appoinments;
