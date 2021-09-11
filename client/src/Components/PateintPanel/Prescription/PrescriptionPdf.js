import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import logo from '../../../assert/logo.jpg'

const styles = StyleSheet.create({
  body: {
    display: "flex",
    alignItems: "center",
    height: "92vh"
  },
  headerPart: {
    display: "flex",
    justifyContent: 'space-between',
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: "25px",
    borderBottom: "1px solid #101010",
    padding: "3%"
  },
  logo: {
    height: "80px",
    width: "80px"
  },
  mainWrapper : {
    width: "80%",
  },

  identityWrap : {
    display: "flex",
    justifyContent: 'space-between',
    alignItems: 'space-between',
    flexDirection: "row",
    flexWrap: 'wrap',
    marginTop: '5%',
    fontSize: "12px"
  },
  prescriptionMainWrapper: {
    // border: "2px solid green",
    height: "80vh",
    paddingTop: "15%"
  },
  prescriptionInnerWrapper: {
    // border: "1px solid red",
    padding: "2%",
  },
  prescriptionHeader: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    borderTop: "1px solid #0A0C12",
    borderRight: "1px solid #0A0C12",
    borderLeft: "1px solid #0A0C12",
    padding: "2%",
    fontSize: "13px",
    fontWeight: 'bold'
  },
  prescriptionContentWrap: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    borderTop: "1px solid #0A0C12",
    borderRight: "1px solid #0A0C12",
    borderLeft: "1px solid #0A0C12",
    padding: "1%",
    paddingLeft: "2%",
    fontSize: "11px",
    fontWeight: 'normal'
  },
  prescriptionContentWrapForLastOne: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap",
    borderTop: "1px solid #0A0C12",
    borderRight: "1px solid #0A0C12",
    borderLeft: "1px solid #0A0C12",
    borderBottom: "1px solid #0A0C12",
    padding: "1%",
    paddingLeft: "2%",
    fontSize: "11px",
    fontWeight: 'normal'
  },
  footerWrap : {
    width: "100%",
    borderTop: "1px solid #101010",
    textAlign: "center",
    padding: "2%",
    position: "fixed",
    left: "0",
    bottom: "0"
  },
  footerHospitalName: {
    color: "#538135",
    fontWeight: "bold",
    fontSize: "16px"
  },
  footerHospitalAddress: {
    color: "#0F111A",
    fontWeight: 'normal',
    fontSize: "11px"
  },
  footerApponent : {
    color: "#0F111A",
    fontWeight: 'normal',
    fontSize: "9px"
  }
});


const PrescriptionPdf = ({data}) => {
    return (
             <Document >
                <Page size="A4" >
                <View style={styles.body} >
                        <View style={styles.mainWrapper}>
                        {/* header part */}
                        <View  style = {styles.headerPart} >
                        {/* logo */}
                            <View>
                                <Image src = {`${logo}`} style = {styles.logo}/>
                            </View>

                            {/* doctor Description part */}
                            <View>
                            {/* doctor Name */}
                            <Text  >
                                <p style = {{textAlign: 'left'}} >Dr. {data.doctorName}</p>
                            </Text>
                            {/* doctor degree */}
                            <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <Text style = {{fontSize: "8px"} }>
                                    <p>
                                    {
                                        data.doctorDegree.map((degree, ind) => (
                                            <span key = {ind}>{degree}, </span>
                                        ))
                                    }
                                    </p>
                                </Text>
                            </View>
                            {/* hospital name */}
                            <View style = {{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}} >
                                <Text style = {{fontSize: "8px"} }>
                                    {data.hospitalName}
                                </Text>
                            </View>
                            </View>
                        </View>
                        
                        {/* Identy part Part */}
                        <View style = {styles.identityWrap}>
                            <Text>
                                <span>Patient Name: {data.patientName}</span>
                            </Text>
                            <Text>
                                <p>Age: {data.age}</p>
                            </Text>
                            <Text style = {{textDecoration: "underline"} }>
                                <p>Date: {new Date().toLocaleDateString()}</p>
                            </Text>
                        </View>
                            
                        {/* prescription part */}
                        <View style = {styles.prescriptionMainWrapper}>
                            <View style = {styles.prescriptionInnerWrapper}>
                                {/* category part */}
                                <View style = {styles.prescriptionHeader}>
                                    <Text style = {{flex: 3}} >Medicine Name </Text>
                                    <Text style = {{flex: 1}} >Amount </Text>
                                    <Text style = {{flex: 1}} >Duration</Text>
                                </View>
                                
                                {/* contentPart */}
                                {
                                data.prescription.map((pres, ind) => {
                                    return (
                                    <View style = {data.prescription.length - 1 == ind ? styles.prescriptionContentWrapForLastOne : styles.prescriptionContentWrap}>
                                        <Text style = {{flex: 3}}>{pres.medicineName}</Text>
                                        <Text style = {{flex: 1}}>{pres.amount}</Text>
                                        <Text style = {{flex: 1}} >{pres.duration}</Text>
                                    </View>
                                    )
                                })
                                }
                            </View>
                        </View>
                    </View>
                </View>

                {/* footer part */}
                <View style = {styles.footerWrap}>
                    <View>
                        <Text style = {styles.footerHospitalName}>{data.hospitalName}</Text>
                        {/* <Text style = {styles.footerHospitalAddress}>{data.hospitalAddress}</Text> */}
                        <Text style = {styles.footerApponent}>
                            <>
                                <p>To get Appointment Call: </p>
                                {data.contactNumber.map((number, ind) => (
                                <p key = {ind}>{number}{data.contactNumber.length -1 == ind ? "" : ","}</p>
                                )) }
                            </>
                        </Text>
                    </View>
                </View>
                
                </Page>
            </Document>
    )
}

export default PrescriptionPdf
