import React, {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import axios from "axios"
import { baseUrl } from '../../utils/baseUrl/baseurl'
import Navbar from '../Home/Navber/Navber'
import MakeAnAppointment from './MakeAnAppointment'


const ShowDoctorByCategory = () => {
    const routerLocation = useLocation()
    const [isLoading, setIsLoading] = useState(true)
    const [doctorData, setDoctorData] = useState([])
    const [searchCategory, setSearchCategory] = useState("")
    const [openModalStatus, setOpenModal] = useState(false)
    const [value, setValue] = useState("")

   
    // make an appointment handler
    const appointmentHandler = (e, doctorId) => {
        e.preventDefault()
        openModal()
        setValue(doctorId)
    }
    //create a open modal handler
    const openModal = () => {
        setOpenModal(true)
    }

    //create a close modal handler 
    const closeModal = () => {
        setOpenModal(false)
    }
    useEffect(() => {
        return (async () => {
            try {
                const {search} = routerLocation //get the search element 
                if(search) {
                    console.log(search);
                    const splitCategory = search.split("=")
                    const category = splitCategory[splitCategory.length - 1]
                    if (category) {
                        setSearchCategory(category)
                        const response = await axios.get(`${baseUrl}/doctor/get/by/category/${category}`)
                        if (response.status == 202) {
                            setIsLoading(false)
                            setDoctorData(response.data.data)
                        }else {
                            setIsLoading(false)
                        }
                    }else {
                        setIsLoading(false)
                    }
                }
            }catch (err) {
                setIsLoading(false)
            }
        })()
    }, [])
    return (
        <div className="bg-primary" >
            <div>
                {
                    isLoading 
                    ?
                    <h1>Loading...</h1>
                    :
                    <>
                        <Navbar/>
                        <h1 className = {`text-center pt-3 mb-3 text-white text-bold`} >Show All {searchCategory} {doctorData.length != 1 ? "Doctors" : "Doctor"}</h1>
                        {
                           doctorData.length == 0 
                           ?
                           <h1>No Doctor found</h1>
                           :
                           <>
                            <div className="row">
                                {
                                     doctorData.map ((data, index) => {
                                         console.log(data._id);
                                         const {personalInfo,
                                                officialInfo} = data //get the data from data response
                                         const {profileImage,
                                                firstName,
                                                lastName,} = personalInfo //get the data from personalInfo
                                        const {educationalHistory} = officialInfo //get the data from official info
                                                console.log(data);
                                        return (
                                           <div  key = {data._id} className="card col-12 col-md-3 p-4 m-4" >
                                                <img src= {`${profileImage}`} className="card-img-top" alt= {`${profileImage}`} style = {{height: "180px", width: "180px", margin: "0 auto"}}/>
                                                <div className="card-body text-center  pt-5">
                                                    <h5 className="card-title">{firstName} {lastName}</h5>
                                                    <div style = {{minHeight: "90px"}}>
                                                        {
                                                            educationalHistory.map((data, ind) => {
                                                                const {degreeName, institute} = data 
                                                                return (
                                                                    <span><span style = {{fontWeight: "bold"}}>{degreeName}</span>,{institute}.</span>
                                                                )
                                                            })
                                                        }
                                                    </div>
                                                    <button className="btn btn-primary " onClick={(e) => appointmentHandler(e, data._id )}>Make An Appointment</button>
                                                    
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                           </div>
                           {
                               openModalStatus 
                                &&
                                <MakeAnAppointment
                                value = {value}
                                openModal = {openModal}
                                closeModal = {closeModal} />
                           }
                           </>
                        }
                    </>
                }
            </div>
        </div>
    )
}

export default ShowDoctorByCategory
