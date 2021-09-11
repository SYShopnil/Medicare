const appointmentSchemaValidation = require('../../../validation/Service/appointment')
const Appointment = require('../../model/Service/Appointment/apponitment')
const Doctor = require('../../model/User/Doctor/doctor')
const Patient = require('../../model/User/Patient/patient')
const generateAppointmentId = require('../../../utils/generateRandomUserID')
const {getTodayDate, getTodaysDateByIsoDateInput, getXDaysBefore} = require('../../../utils/dateController')
const sentMailer = require('../../../utils/sendMailer')

//create an appointment controller 
const createAppointmentController = async (req, res) => {
    try {
        const {error} = appointmentSchemaValidation.validate(req.body) //validate the schema with joi 
        if(error){ //if the schema validation failed then it will execute
            res.json({
                message: "Joi Validation failed",
                error
            })
        }else {
            const {id:appointmentRequestUserId} = req.user //get the data from header 
            const {doctorId, appointmentDate} = req.body //get the data from body 
            if(doctorId) { //check that if doctorId and request user object id exist or not 
                const {userId: appointmentId} = generateAppointmentId("Appointment") //get a random user id of appointment 
                if(appointmentId) { //if the appointment_id auto generate then it will execute 
                    const newAppointment = new Appointment({ //create a new appointment 
                        ...req.body,
                        "appointmentDetails.doctorDetails": doctorId,
                        "appointmentRequestUser": appointmentRequestUserId,
                        "appointmentDetails.appointmentId": appointmentId,
                        "appointmentDetails.appointmentDate": appointmentDate
                    })
                    const saveAppointment = await newAppointment.save() //save the new appointment  
                    if(saveAppointment) { //if the appointment is save then it will execute 
                        //store this appointment into doctor's schema 
                        const {_id:NewAppointmentId} = saveAppointment //get the object id of new create appointment
                        const storeAppointmentToDoctor =  await Doctor.updateOne( //store the new appointment  object id as a reference in respected doctor schema 
                            {
                                _id: doctorId,
                                "officialInfo.isActive": true,
                                "officialInfo.isDelete": false
                            }, //querry
                            {
                                $push: {
                                    "officialInfo.checkUpHistory.appointment": NewAppointmentId
                                },
                                $currentDate: {
                                    "modificationInfo.updatedAt": true
                                }
                            }, //update,
                            {multi: true} //option
                        )

                        if (storeAppointmentToDoctor.nModified != 0) {
                            const storeAppointmentToPatient = await Patient.updateOne( //store the appointment into patient
                                {
                                    _id: appointmentRequestUserId,
                                    "officialInfo.isActive": true,
                                    "officialInfo.isDelete": false
                                }, //querry
                                {
                                    $push: {
                                        "officialInfo.checkUpHistory.appointment": NewAppointmentId
                                    },
                                    $currentDate: {
                                        "modificationInfo.updatedAt": true
                                    }
                                }, //update 
                                {multi: true} //option
                            )

                            if(storeAppointmentToPatient.nModified != 0) { //if the appointment id is store in requested patient schema then it will execute
                                const findAppointmentRequester = await Patient.findOne({_id: appointmentRequestUserId}).select("personalInfo.contact")
                                if(findAppointmentRequester) {
                                    //  res.status(202).json({
                                    //     message: "New Appointment has been created",
                                    //     info: saveAppointment
                                    // }) //if all is done then it will sent as a response
                                    const {email:requesterEmail} = findAppointmentRequester.personalInfo.contact
                                    const date = appointmentDate
                                    const message = `Your Appointment is confirmed!!! Appointment id: ${appointmentId}. Appointment Date: ${date}. For any enquiries call 09666-710678
                                    `
                                    const {message:responseMessage, responseStatus} = await sentMailer("", requesterEmail, message, "Appointment Confirmation")
                                    if(responseStatus) {
                                        res.status(201).json({
                                            message: "New Appointment is confirmed",
                                            appointmentId,
                                            mailResponseMessage: responseMessage
                                        })
                                    }else {
                                        res.json({
                                            message: "Your Appointment is confirmed",
                                            appointmentId,
                                            mailResponseMessage: "Mail sent failed",
                                        })
                                    }
                                }else {
                                     res.json({
                                        message: "New Appointment failed to update into patient schema"
                                    })
                                }
                            }else {
                                res.json({
                                    message: "New Appointment failed to update into patient schema"
                                })
                            }
                        }else {
                            res.json({
                                message: "New Appointment failed to update into doctor schema"
                            })
                        }
                    }else{
                        res.json({ 
                            message: "New Appointment creation failed"
                        })
                    }
                }else {
                    res.json({
                        message: "Appoint id generate failed"
                    })
                }
            }else {
                res.json({
                    message: "Doctor or Request user object id required"
                })
            }
        }
    }catch(err) {
        console.log(err);
        res.json({
            message: err.message
        })
    }
}

//see today's appointment  controller
const showTodaysAppointmentController = async(req, res) => {
    try {
        const  {startOfDay, endOfDay} = getTodayDate() //get the range of today's date
        const {date:dd, year:yy, month:mm} = getTodaysDateByIsoDateInput(endOfDay) //get today's date
        
        const todaysDateFormate =  `${yy}-${mm}-${dd}`   //set the today's date format
        const findAppointment = await Appointment.find( //find all today's appointment
            {
                "appointmentDetails.appointmentDate": {
                    $gt: startOfDay,
                    $lt: endOfDay
                }
            }
        ).populate({
                path: "appointmentDetails.prescription",
                select: "prescriptionData",
                populate: {
                    path: "doctorInfo",
                    select: "_id"
                }
            }).populate({ //get the appointment doctor details
            path: "appointmentDetails.doctorDetails",
            select: `-_id
             -personalInfo.profileImage 
             -officialInfo 
             -modificationInfo 
             -userType 
             -recoveryToken 
             -password -userId
              -personalInfo.sex`
        }).populate({ //get the appointment requested patient
            path: "appointmentRequestUser",
            select: "personalInfo"
        }).select("-others -modificationInfo").sort({
            "appointmentDetails.appointmentDate": 1
        }) //sort by appointment date

        if(findAppointment.length != 0 || findAppointment != null) {
            res.status(202).json({
                message: `Appointment Found of ${todaysDateFormate}`,
                data: findAppointment
            })
        }else{
            res.json({
                message: `Appointment Not Found for ${todaysDateFormate} `
            })
        }
    }catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            err
        })
    }
}

//see last seven days appointment
const seeSevenDaysAppointment = async(req, res) => {
    try {
        const {dateFrom, dateTo} = getXDaysBefore(7) //get the date range of 7 days from 7 days to current date
        if(dateFrom && dateTo) {
            const findAppointment = await Appointment.find(
                {
                    "others.isDelete": false,
                    "others.isActive": true
                }
            ).populate( //get the doctor data from ref
                { 
                    path: "appointmentDetails.doctorDetails",
                    select: `
                             -personalInfo.profileImage 
                             -personalInfo.sex 
                             -personalInfo.profileImage 
                             -officialInfo -password 
                             -recoveryToken 
                             -modificationInfo `
                }
            ).populate({
                path: "appointmentDetails.prescription",
                select: "prescriptionData",
                populate: {
                    path: "doctorInfo",
                    select: "_id"
                }
            }).populate({ //get the requested user data
                path: "appointmentRequestUser",
                select: `
                        -personalInfo.profileImage
                        -officialInfo
                        -password
                        -recoveryToken
                        -modificationInfo`
            }).select(`-others 
                        -modificationInfo`).sort({"appointmentDetails.appointmentDate": -1})
            
            if(findAppointment) {
                const getSevenDaysAppointment = findAppointment.filter(data => data.appointmentDetails.appointmentDate >= dateFrom && data.appointmentDetails.appointmentDate <= dateTo)
                res.status(202).json({
                    message: "Last 7 days all appointments found",
                    appointment: getSevenDaysAppointment
                })
            }else {
                res.json({
                    message: "Appointment not found"
                })
            }
        }else {
            res.json({
                message: "Date not found"
            })
        }
    }catch(err) {
        console.log(err);
        res.json({
            message: err.message,
            err
        })
    }
}

//get appointment by id 
const getAppointmentByIdController = async (req, res) => {
    try {
        const {id} = req.params //get the id from params 
        if(id) {
            const findAppointment =  await Appointment.findOne(
                {
                    "_id": id,
                    "others.isDelete": false,
                    "others.isActive": true
                }
            ).populate( //get the doctor data from ref
                { 
                    path: "appointmentDetails.doctorDetails",
                    select: `
                             -personalInfo.profileImage 
                             -personalInfo.sex 
                             -personalInfo.profileImage 
                            -password 
                             -recoveryToken 
                             -modificationInfo `
                }
            ).populate({ //get the requested user data
                path: "appointmentRequestUser",
                select: `
                        -personalInfo.profileImage
                        -officialInfo
                        -password
                        -recoveryToken
                        -modificationInfo`
            }).populate({
                path: "appointmentDetails.prescription",
                select: "prescriptionData",
                populate: {
                    path: "doctorInfo",
                    select: "_id"
                }
            }).select(`-others 
                        -modificationInfo`)
                    
            if(findAppointment) {
                res.status(202).json({
                    message: "Apponitment Found",
                    data: findAppointment
                })
            }else {
                res.json({
                    message: "Requested appointment not found"
                })
            }
            
        }else {
            res.json({
                message: "Appoint object id required"
            })
        }
    }catch(err) {
        console.log(err);
        res.json({
            message: err.message,
            err
        })
    }
}

//see all appointment f
const showALlAppointmentController = async(req, res) => {
    try {
        const  {startOfDay, endOfDay} = getTodayDate() //get the range of today's date
        const {date:dd, year:yy, month:mm} = getTodaysDateByIsoDateInput(endOfDay) //get today's date
        const todaysDateFormate =  `${yy}-${mm}-${dd}`   //set the today's date format
        const findAppointment = await Appointment.find( //find all today's appointment
            {
                "others.isDelete": false,
                "others.isActive": true
            }
        ).select("-modificationInfo -others").populate({ //get the appointment doctor details
            path: "appointmentDetails.doctorDetails",
            select: `-_id
             -personalInfo.profileImage 
             -officialInfo 
             -modificationInfo 
             -userType 
             -recoveryToken 
             -password -userId
              -personalInfo.sex`
        }).populate({
                path: "appointmentDetails.prescription",
                select: "prescriptionData",
                populate: {
                    path: "doctorInfo",
                    select: "_id"
                }
            }).populate({ //get the appointment requested patient
            path: "appointmentRequestUser",
            select: "personalInfo"
        }).sort({
            "appointmentDetails.appointmentDate": 1
        })//sort by appointment date

        if(findAppointment.length != 0 || findAppointment != null) {
            res.status(202).json({
                message: `All Appointment Found successfully till ${todaysDateFormate}`,
                data: findAppointment
            })
        }else{
            res.json({
                message: `Appointment Not Found till ${todaysDateFormate} `
            })
        }
    }catch (err) {
        console.log(err);
        res.json({
            message: err.message,
            err
        })
    }
}

//update appointment by id 
const updateAppointmentById = async (req, res) => {
    try {
        const {id} = req.params //get the id from params 
        if(id) {
            const findAppointmentAndUpdate = await Appointment.updateOne(
                {
                    _id: id, 
                    "others.isDelete": false,
                    "others.isActive": true
                }, //query 
                {
                    $set: req.body,
                    $currentDate: {
                        "modificationInfo.updatedAt": true
                    }
                }, //update 
                {multi:true} //option
            ) //find the appointment by id and update what by what came from req body 
            if(findAppointmentAndUpdate.nModified != 0) {
                res.status(202).json({
                    message: "Appointment is successfully updated"
                })
            }else {
                res.json({
                    message: "Appointment update failed"
                })
            }
        }else {
            res.json({
                message: "Object Id required for appointment edit"
            })
        }
    }catch(err) {
        console.log(err);
        res.json({
            message: err.message,
            err
        })
    }
}

//delete appointment by id 
const deleteAppointmentById = async (req, res) => {
    try {
        const {id} = req.params //get the id from params 
        if(id) {
            const findAppointMentAndDeleteTemp = await Appointment.updateOne( //find the appointment by id and delete it temporary
                {
                    _id: id,
                    "others.isDelete": false,
                    "others.isActive": true,
                }, //query 
                {
                    "others.isDelete": true,
                    "others.isActive": false,
                }, //upadate
                {multi: true} //option
            ) //find the appointment by id and delete it temporary
            if(findAppointMentAndDeleteTemp.nModified != 0) {
                res.getTodaysDateByIsoDateInput(202).json({
                    message: "Appointment has successfully deleted"
                })
            }else {
                res.json({
                    message: "Appointment Delete failed"
                })
            }
        }else {
            res.json({
                message: "Appointment Object Id required"
            })
        }
    }catch(err) {
        console.log(err);
        res.json({
            message: err.message,
            err
        })
    }
}

//export part 
module.exports = {
    createAppointmentController,
    showTodaysAppointmentController,
    showALlAppointmentController,
    seeSevenDaysAppointment,
    updateAppointmentById,
    deleteAppointmentById,
    getAppointmentByIdController
}