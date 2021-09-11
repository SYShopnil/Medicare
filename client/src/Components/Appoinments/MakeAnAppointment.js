import React, {useState}from 'react'
import modelStyleSheet from  '../../utils/modalCss/modal.module.css'
import axios from 'axios'
import {baseUrl} from '../../utils/baseUrl/baseurl'
import {connect} from 'react-redux'

const MakeAnAppointment = ({
  closeModal,
  header,
  value,
  openModal
}) => {
//   console.log({value})
   const  [formData, setFormdata] = useState({
    name : "",
    age: "",
    sex: "",
    number: "",
    appointmentDate: ""
  })


//    make an appointment  handlers
  const appointmentHandler = async(e) => {
    e.preventDefault() 
    const body = {
        patientDetails: {
            name: formData.name,
            age: formData.age,
            sex: formData.sex,
            contactNumber: formData.contactNumber
        },
        appointmentDate: formData.appointmentDate,
        doctorId: value
    }
    console.log(body);
    const responseOfUpdate = await axios.post(`${baseUrl}/appointment/create`, body, header) //request for update 
    if(responseOfUpdate.status == 201) {
      closeModal()
    //   setIsChange(!isChange)
    }
    alert(responseOfUpdate.data.message)
  }
  return (
    <div className= {`${modelStyleSheet.wrap}`} >
              <div  tabindex="-1">
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title">Make An Appointment</h5>
                      <button 
                      type="button" 
                      className="btn-close" 
                      data-bs-dismiss="modal" 
                      aria-label="Close"
                      onClick = {(e) => {closeModal()}}></button>
                    </div>
                    <div className="modal-body">
                        <form className="col-md-12">

                        {/* patient Name */}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Patient Name
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setFormdata({...formData, name: e.target.value})}
                              className="form-control"
                              id="exampleInputEmail1"
                              value = {formData.name}
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                        {/* age */}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Age
                            </label>
                            <input
                              onChange={(e) => setFormdata({...formData, age: e.target.value})}
                              type="text"
                              className="form-control"
                              id="exampleInputEmail1"
                              value = {formData.age}
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                          {/* sex */}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Sex
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setFormdata({...formData, sex: e.target.value})}
                              value = {formData.sex}
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                          {/* contact number */}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Contact Number
                            </label>
                            <input
                              type="text"
                              onChange={(e) => setFormdata({...formData, contactNumber: e.target.value})}
                              value = {formData.contactNumber}
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            ></input>
                          </div>

                          {/* appointment date*/}
                          <div className="mb-3">
                            <label for="exampleInputEmail1" className="form-label">
                              Appointment Date
                            </label>
                            <input
                              type="date"
                              onChange={(e) => setFormdata({...formData, appointmentDate: e.target.value})}
                              value = {formData.appointmentDate}
                              className="form-control"
                              id="exampleInputEmail1"
                              aria-describedby="emailHelp"
                            ></input>
                          </div>
                          <button
                              className="form-control mt-3 btn btn-danger"
                              onClick = {(e) => appointmentHandler(e)}
                            >Make Appointment</button>
                      </form> 
                    </div>
                    {/* <div class="modal-footer">
                      <button 
                      type="button" 
                      class="btn btn-secondary" 
                      data-bs-dismiss="modal"
                      onClick = {(e) => {closeModal()}}>Close</button>
                    </div> */}
                  </div>
                </div>
              </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    header: state.login.headers
  }
}

export default  connect(mapStateToProps)(MakeAnAppointment)

