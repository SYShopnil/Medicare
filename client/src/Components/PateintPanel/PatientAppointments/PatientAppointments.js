import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl/baseurl";


const PatientAppointments = ({
  loggedInUserData,
  header
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointment, setApppointment] = useState([])
  // console.log({appointment});

  //load the user's appointment
  useEffect(() => {
    return (async () => {
      const sentAppoinmentRequest = await axios.get(`${baseUrl}/user/get/own/appointment`, header)
      // console.log(sentAppoinmentRequest.data);
      if (sentAppoinmentRequest.status == 202) {
        setApppointment(sentAppoinmentRequest.data.data)
        setIsLoading(false)
      }else {
        setIsLoading(false)
      }
    })()
  }, [])
  return (
    <>
      {
        isLoading 
        ?
        <h1>Loading...</h1>
        :
        <div>
          <h1 className="text-center mt-5 bg-danger text-light">My Appointment</h1>
          <div className="table">
            <table className="table table-bordered bg-dark table-striped p-3">
              <thead
                style={{ fontSize: "20px" }}
                className="text-center text-warning p-2"
              >
                <th scope="col">SL</th>
                <th scope="col">Appointment ID</th>
                <th scope="col">Appointment Date</th>
                <th scope="col">Details</th>
                {/* <th scope="col">Category</th>
                <th scope="col">Contact</th> */}
                {/* <th>action</th> */}
              </thead>
              <tbody>
                {appointment.map((appointment, i) => (
                  <tr key = {appointment._id}className="text-center text-white">
                    <td>{i + 1}</td>
                    <td>{appointment.appointmentDetails.appointmentId}</td>
                    <td>
                      {new Date(appointment.appointmentDetails.appointmentDate).toDateString()}
                    </td>
                    <td>
                      <span
                        // onClick={() => {
                        //   openModal(doctor);
                        // }}
                        className="btn btn-danger me-2"
                      >
                        Details
                      </span>
                      {/* <span className="btn btn-danger" onClick={(e) => doctorDeleteHander(e, doctor._id)}>Delete</span> */}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      }
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    loggedInUserData : state.login.loggedInUserData,
    header : state.login.headers
  }
}

// export default PatientAppointments;
export default connect(mapStateToProps)(PatientAppointments);
