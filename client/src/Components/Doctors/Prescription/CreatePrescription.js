import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {baseUrl} from '../../../utils/baseUrl/baseurl'

const CreatePrescription = () => {
    const header = useSelector(state => state.login.headers)
    const location = useLocation()
    const history = useHistory()
    const initialState = {
        medicineName: "",
        amount: "",
        duration: ""
    }
    const [prescriptionData, setPrescriptionData] = useState([])
    const [currentData, setCurrentData] = useState(initialState)

    if (location.search) {
        const arr = location.search.split("?")[1].split("&&")
        var patientUserId , appointmentId
        arr.map((data,i) => {
            if (i == 0) {
                appointmentId = data.split("=")[1]
            }else if (i == 1) {
                patientUserId = data.split("=")[1]
            }
        })
    }
    //  console.log({patientId, appointmentId})
 
    //create a new prescription handler 
    const createPrescriptionController = async (e) => {
        e.preventDefault() ; 
        const body = {
            appointmentId,
            patientUserId,
            prescriptionData
        }
        // console.log(body)
        const sentNewPrescriptionCreateReq = await axios.post(`${baseUrl}/prescription/create`, body, header)
        if (sentNewPrescriptionCreateReq.status == 201) {
            alert(sentNewPrescriptionCreateReq.data.message);
            history.push(`/doctor/yourAppointment`)
        }else {
            alert(sentNewPrescriptionCreateReq.data.message);
        }
    }
    //prescription add handler 
    const addHandler = (e) => {
        e.preventDefault();
        setPrescriptionData([...prescriptionData, currentData ])
        setCurrentData(initialState)
    }

    return (
        <div>
            <div id="title" className="bg-success w-50 mt-5">
                <h1 className="text-center text-light">Create New Prescription</h1>
            </div>

            {/* prescriptionData add part */}
            <div className="col-md-6" id="title">
                <form action="">
                    {/* medicine name */}
                    <div class="form-group mb-2">
                        <input
                        type="text"
                        value = {currentData.medicineName}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Medicine Name"
                        name = "medicineName"
                        onChange={(e) => setCurrentData({...currentData, medicineName: e.target.value})}
                        ></input>
                    </div>

                    {/* amount */}
                    <div class="form-group mb-2">
                        <input
                        type="text"
                        value = {currentData.amount}
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Amount"
                        name = "amount"
                        onChange={(e) => setCurrentData({...currentData, amount: e.target.value})}
                        ></input>
                    </div>

                    {/* duration */}
                    <div class="form-group mb-2">
                        <input
                        value = {currentData.duration}
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Duration"
                        name = "duration"
                        onChange={(e) => setCurrentData({...currentData, duration: e.target.value})}
                        ></input>
                    </div>

                    {/* add button */}
                    <button class="btn btn-success"  onClick = {(e) => addHandler(e)}>Add</button>
                </form>
            </div>

            {/* output part */}
            <div className = {`mx-5`}> 
                <table className="table table-bordered bg-dark  table-striped p-3">
                    <thead
                        style={{ fontSize: "20px" }}
                        className="text-center text-warning p-2"
                    >
                        <th scope="col">SL.</th>
                        <th scope="col">Medicine Name</th>
                        <th scope="col">Amount</th>
                        <th scope="col">Duration</th>
                    </thead>
                    <tbody>
                        {prescriptionData.map((data, i) => (
                        <tr className="text-center text-white p-2">
                            <td>{i + 1}</td>
                            <td>{data.medicineName}</td>
                            <td>{data.amount}</td>
                            <td>{data.duration}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* create button part */}
            {
                prescriptionData.length != 0
                &&
                <div>
                    <button className = {`mx-5 btn btn-warning`} onClick={(e) => createPrescriptionController(e)}>Create new</button>
                </div>
            }
          
        </div>
    );
}

export default CreatePrescription
