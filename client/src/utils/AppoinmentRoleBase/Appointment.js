import React, {useState, useEffect}from 'react'
import {Link, useParams} from 'react-router-dom'
import axios from 'axios'
import {useSelector} from 'react-redux'
import {baseUrl} from "../../utils/baseUrl/baseurl"
import Prescription from '../../Components/PateintPanel/Prescription/Prescription'

const Appointment = () => {
    const {id} = useParams() //get the appointment id 
    const header = useSelector (state => state.login.headers)
    const loginState = useSelector (state => state.login)
    const [appointment, setAppointment] = useState({})
    const [succesfulAppointment, setSuccesfulAppointment] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    // console.log({appointment, succesfulAppointment});

    //check that is appointment data get or not
    if (succesfulAppointment) {
        var {appointmentDate, appointmentId, doctorDetails} = appointment.appointmentDetails
        var {firstName:requesterFirstName, lastName:requsterLastName} = appointment.appointmentRequestUser.personalInfo
        var {_id:appointmentReqUserId} = appointment.appointmentRequestUser
        var  {name:patientName, age:patientAge, sex:patientSex, contactNumber:patientContactNumber} = appointment.patientDetails
    }
    //check the user is logged in or not 
    if (!loginState.isLoading && loginState.isLoggedIn) {
        var  {userType} = loginState.loggedInUserData.data
    }

    // useEffect(() => {
    //     return (async () => {
    //         if (true) {
    //             const appointmentData = await axios.get(`${baseUrl}/appointment/get/individual/${appointmentId}`, header)
    //             if (appointmentData.data.data.appointmentDetails.prescription != undefined) {
    //                 setShowUpdateButton(true)
    //                 setIsLoading(false)
    //             }else {
    //                 setShowUpdateButton(true)
    //                 setIsLoading(false)
    //             }
    //         }
    //     })()
    // }, [])

    //get the individual appointments data from id  
    useEffect(() => {
        return (async() => {
            const sentAppointmentReq = await axios.get(`${baseUrl}/appointment/get/individual/${id}`, header) //sent the request to get the particular appointment details
            if (sentAppointmentReq.status == 202) {
                if (sentAppointmentReq.data.data.appointmentDetails.prescription != undefined){
                    setIsLoading(false)
                    setAppointment(sentAppointmentReq.data.data)
                    setSuccesfulAppointment(true)
                    setShowUpdateButton(true)
                }else {
                    setIsLoading(false)
                    setAppointment(sentAppointmentReq.data.data)
                    setSuccesfulAppointment(true)
                    setShowUpdateButton(false)
                }
            }else {
                setIsLoading(false)
                setSuccesfulAppointment(false)
                setAppointment({})
            }
        })()
    }, [])
    // console.log({appointment});
   
    return (
        <div>   
            {
                isLoading 
                ?
                <h1>Loading...</h1>
                :
                <>
                    
                    {
                        succesfulAppointment
                        ?
                        <div className = {`d-flex justify-content-center align-items-center m-3`} style = {{height: "100vh"}}>
                             {/* patient details part */}
                            <div className="card p-4" style= {{width: "100%", positive: "relative"}}>
                                <div className="card-body row">
                                    {/* patient info part */}
                                    <div className= {`col-12 col-md-4`}>
                                        <h3 className="card-title fw-bold">Patient Information</h3>
                                        <h5>Name: {patientName}</h5>
                                        <h6>Age: {patientAge}</h6>
                                        <h6>Sex: {patientSex}</h6>
                                        <h6>Contact Number: {patientContactNumber}</h6>
                                    </div>

                                    {/* appointment info part */}
                                    <div className= {`col-12 col-md-4`}>
                                        <h3 className="card-title fw-bold">Appoiuntment Information</h3>
                                        <h5>Appointment Id: {appointmentId}</h5>
                                        <h6>Appointment Date: {new Date(appointmentDate).toLocaleDateString()}</h6>
                                    </div>

                                    {/* Doctor Details part */}
                                    <div className= {`col-12 col-md-4`}>
                                        <h3 className="card-title fw-bold">Doctor Information</h3>
                                        <h6>Doctor Name: {doctorDetails.personalInfo.firstName} {doctorDetails.personalInfo.lastName}</h6>
                                        <h6>Contact Number: {doctorDetails.personalInfo.contact.number}</h6>
                                        <h6>Email: {doctorDetails.personalInfo.contact.email}</h6>
                                    </div>

                                      {/* fake one left part */}
                                    <div className= {`col-12 col-md-2`}></div>
                                    
                                    {/* Prescription Details part */}
                                    <div className= {`col-12 col-md-8`}>
                                        
                                        {
                                            !loginState.isLoading && loginState.isLoggedIn  //check that is user is logged in or not
                                            &&
                                            <>
                                                {
                                                    userType == "patient"
                                                    ?
                                                    //patient part 
                                                    <div className= {`text-center`}>
                                                        {/* <button className = {`btn btn-danger me-1`} >Download Prescription</button> */}
                                                       {
                                                           showUpdateButton 
                                                           &&
                                                            <Prescription
                                                            doctorDetails = {appointment.appointmentDetails.doctorDetails}
                                                            patientDetails = {appointment.patientDetails}
                                                            prescriptionData = {appointment.appointmentDetails.prescription}
                                                            appointmentDetails = {appointment.appointmentDetails}/>
                                                       }

                                                      
                                                       
                                                    </div>
                                                    :
                                                    <>
                                                        {
                                                            userType == "doctor" 
                                                            &&
                                                            //doctor part 
                                                            <div className= {`text-center`}>
                                                                {
                                                                    !showUpdateButton 
                                                                    ?
                                                                     <Link to = {`/doctor/yourAppointment/create/new?aptId=${id}&&ptId=${appointmentReqUserId}`} className = {`btn btn-primary me-1`} >Create Prescription</Link>
                                                                     :
                                                                     <Link to = {`/doctor/yourAppointment/update?aptId=${id}&&ptId=${appointmentReqUserId}`} className = {`btn btn-warning `} >Update Prescription</Link>
                                                                }
                                                                
                                                            </div> 
                                                        }
                                                    </>

                                                }
                                            </>
                                        }
                                       
                                    </div>

                                     {/* fake one right part */}
                                    <div className= {`col-12 col-md-2`}></div>

                                    {/* footer part */}
                                    <div className= {`col-12`} >
                                         <p 
                                        className= {`text-end `} 
                                        style = {{position: "absolute" , bottom: "0", right : "2%"}}>
                                            <span className= {`fw-bold`}  >Refference by:</span> {requesterFirstName} {requsterLastName}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        :
                        <h1 className = {`text-dark`}>No Appointment found</h1>
                    }
                </>
            }
        </div>
    )
}

export default Appointment
