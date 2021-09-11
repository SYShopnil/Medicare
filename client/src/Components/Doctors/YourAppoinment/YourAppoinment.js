import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import axios from 'axios'
import { baseUrl } from "../../../utils/baseUrl/baseurl";
import { useHistory , useLocation} from "react-router";

const YourAppoinment = ({
    loggedInUserData,
    header
}) => {
  const [isLoading, setIsLoading] = useState(true)
  const [appointment, setApppointment] = useState([])
  const history = useHistory()
  const  {pathname} = useLocation()
  const [appointmentId, setAppointmentId] = useState("")
  // console.log({appointment});

  //sent individual appointment data in another page 
  const appointmentDetailsHandler = (e, id) => {
    e.preventDefault();
    history.push(`${pathname}/details/${id}`)

  }

  //load the user's appointment
  useEffect(() => {
    return (async () => {
      const sentAppoinmentRequest = await axios.get(`${baseUrl}/user/get/own/appointment`, header)
      // console.log(sentAppoinmentRequest.data);
      if (sentAppoinmentRequest.status == 202 &&  sentAppoinmentRequest.data.foundItems !== 0 ) {
        setApppointment(sentAppoinmentRequest.data.data)
        setIsLoading(false)
      }else {
        setIsLoading(false)
        setApppointment([])
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
          <h1 className="text-center mt-5 bg-success text-light mb-2">My Appointment</h1>
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
                        onClick = {(e) => appointmentDetailsHandler(e, appointment._id )}
                        className="btn btn-success me-2"
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
}


const mapStateToProps = (state) => {
  return {
    loggedInUserData : state.login.loggedInUserData,
    header : state.login.headers
  }
}

export default connect(mapStateToProps)(YourAppoinment);
