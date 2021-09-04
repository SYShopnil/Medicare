import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { baseUrl } from "../../../utils/baseUrl/baseurl";

const Doctors = () => {
  const header = useSelector((state) => state.login.headers);
  console.log(header);

  useEffect(() => {
    return (async () => {
      const getAllDoctor = await axios.get(`${baseUrl}/doctor/get/all`, header);
      console.log(getAllDoctor.data);
    })();
  }, []);
  return (
    <div>
      <h1>doctors</h1>
    </div>
  );
};

export default Doctors;
