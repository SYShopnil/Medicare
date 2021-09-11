import React, {useState} from "react";
import { PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import PrescriptionPdf from "./PrescriptionPdf";
import modalCss from '../../../utils/modalCss/modal.module.css'

const Prescription = ({
  doctorDetails,
  patientDetails,
  prescriptionData,
  appointmentDetails
}) => {
  let degreeName = []
  doctorDetails.officialInfo.educationalHistory.map(data => degreeName.push(data.degreeName))
  console.log({prescriptionData});
   const data = {
    age: patientDetails.age,
    doctorName: `${doctorDetails.personalInfo.firstName} ${doctorDetails.personalInfo.lastName}`,
    patientName: `${patientDetails.name}`,
    doctorDegree: degreeName,
    hospitalName: "Medicare",
    // hospitalAddress : "Medical College Road, Dinajpur 5200",
    contactNumber: ['10606'],
    prescription: prescriptionData.prescriptionData
  }
  const [showPreview, setShowPreview] = useState(false)
  return (
    <div>
      <PDFDownloadLink className = {`btn btn-danger`} document={<PrescriptionPdf data = {data}/>} fileName={`${appointmentDetails.appointmentId}.pdf`}>
      {({ blob, url, loading, error }) =>(
        loading ? `Loading` : `Download Prescription`
      )}
    </PDFDownloadLink>
    
   
    <button className = {`btn btn-warning ms-3`} onClick = {(e) => setShowPreview(!showPreview)} >{showPreview ? "Hide" : "View Prescription"}</button>
     
    {
      showPreview
      &&
       <div className= {` ${modalCss.wrap}`}>
         <button 
         style = {{position: "absolute", right: "5%", top: "2%"}}
         onClick = {(e) => setShowPreview(!showPreview)} className={`btn btn-danger`}><i class="fas fa-times"></i></button>
    ... <PDFViewer style = {{height: "60vh" , width: "70%"}}>
          <PrescriptionPdf data = {data}/>
        </PDFViewer>
      </div>
    }

    </div>
  );
};

export default Prescription;
