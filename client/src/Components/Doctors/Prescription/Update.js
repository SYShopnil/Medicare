import React, {useState, useEffect} from 'react'
import {useLocation, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {baseUrl} from '../../../utils/baseUrl/baseurl'

const Update = () => {
    const header = useSelector(state => state.login.headers)
    const location = useLocation()
    const [prescriptionId, setPrescriptionId] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const initialState = {
        data: {
            medicineName: "",
            amount: "",
            duration: "",
        },
        index: ""
    }
    const [showUpdateButton, setShowUpdateButton] = useState(false)
    const [prescriptionData, setPrescriptionData] = useState([])
    const [currentData, setCurrentData] = useState(initialState)
    console.log({currentData});
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
 
    //update final  a exist prescription handler 
    const finalUpdateHandler = async (e) => {
        e.preventDefault() ; 
        const body =  {
            prescriptionData
        }
        // console.log(body)
        const setUpdatePrescriptionReq = await axios.put(`${baseUrl}/prescription/update/information/${prescriptionId}`, body, header)
        if (setUpdatePrescriptionReq.status == 202) {
            alert(setUpdatePrescriptionReq.data.message);
            history.push(`/doctor/yourAppointment`)
        }else {
            alert(setUpdatePrescriptionReq.data.message);
        }
    }
    //prescription add handler 
    const addHandler = (e) => {
        e.preventDefault();
        setPrescriptionData([...prescriptionData, currentData.data ])
        setCurrentData(initialState)
    }
    // console.log({prescriptionData});

    //appointment update handler
    const updateHandler = (e, existData, index) => {
        e.preventDefault()
        const data = existData  //get the selected data 
        setCurrentData({
            index,
            data: {
                ...existData
            }
        })
        setShowUpdateButton(true)
    }

    //update the exist data handler 
    const updateExistHander = (e) => {
        e.preventDefault()
        const mainDataFile = [...prescriptionData]
        mainDataFile[currentData.index] = currentData.data
        setPrescriptionData(mainDataFile)
        setShowUpdateButton(false)
        setCurrentData(initialState)
    }

    //store the prescription data part 
    useEffect (() => {
        return (async () => {
            const getExistingPrescriptionData = await axios.get(`${baseUrl}/appointment/get/individual/${appointmentId}`, header)
            // console.log(getExistingPrescriptionData);
            setPrescriptionData(getExistingPrescriptionData.data.data.appointmentDetails.prescription.prescriptionData)
            setPrescriptionId(getExistingPrescriptionData.data.data.appointmentDetails.prescription._id)
        })()
    }, [])
    return (
        <div>
           <div id="title" className="bg-warning w-50 mt-5">
                    <h1 className="text-center text-waring">Update Existing Prescription</h1>
                </div>

                {/* prescriptionData add part */}
                <div className="col-md-6" id="title">
                    <form action="">
                        {/* medicine name */}
                        <div class="form-group mb-2">
                            <input
                            type="text"
                            value = {currentData.data.medicineName}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Medicine Name"
                            name = "medicineName"
                            onChange={(e) => setCurrentData({...currentData, data: {...currentData.data, medicineName: e.target.value}})}
                            ></input>
                        </div>

                        {/* amount */}
                        <div class="form-group mb-2">
                            <input
                            type="text"
                            value = {currentData.data.amount}
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Amount"
                            name = "amount"
                            onChange={(e) => setCurrentData({...currentData, data: {...currentData.data, amount: e.target.value}})}
                            ></input>
                        </div>

                        {/* duration */}
                        <div class="form-group mb-2">
                            <input
                            value = {currentData.data.duration}
                            type="text"
                            className="form-control"
                            id="exampleInputEmail1"
                            aria-describedby="emailHelp"
                            placeholder="Duration"
                            name = "duration"
                            onChange={(e) =>setCurrentData({...currentData, data: {...currentData.data, duration: e.target.value}})}
                            ></input>
                        </div>

                        {
                            showUpdateButton 
                            ?
                            //update button 
                            <button class="btn btn-danger"  onClick = {(e) => updateExistHander(e)}>Update</button>
                            :
                            //add button
                            <button class="btn btn-success"  onClick = {(e) => addHandler(e)}>Add</button>
                        }
                       
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
                            <th scope="col">Edit</th>
                        </thead>
                        <tbody>
                            {prescriptionData.map((data, i) => (
                            <tr className="text-center text-white p-2">
                                <td>{i + 1}</td>
                                <td>{data.medicineName}</td>
                                <td>{data.amount}</td>
                                <td>{data.duration}</td>
                                <td>
                                    <button 
                                    className = {`btn btn-warning`}
                                    onClick = {(e) => updateHandler(e,data, i)}>Update</button>
                                </td>
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
                        <button className = {`mx-5 btn btn-warning`} onClick={(e) => finalUpdateHandler(e)}>Final Update</button>
                    </div>
                }
          
        </div>
    );
}

export default Update
