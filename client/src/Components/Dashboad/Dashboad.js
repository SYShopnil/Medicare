import React, {useState, useEffect}from 'react'
import {useSelector} from 'react-redux'
import Admin from '../Admins/Admin/Admin'
import Doctor from '../Doctors/Doctor/Doctor'
import PatientPanel from '../PateintPanel/PatientPanel/PatientPanel'
import {useHistory} from 'react-router-dom'

const Dashboad = () => {
    const [userType, setUserType] = useState("")
    const [loading, setIsLoading] = useState(false)
    const {isLoading, isLoggedIn, loggedInUserData} = useSelector(state => state.login)
    const history = useHistory()
    //get the dash board component 
    useEffect(() => {
        if (!isLoading && isLoggedIn) {
            const userType = loggedInUserData.data.userType
            setUserType(userType)
            if (userType == "doctor") {
                history.push(`/doctor`)
            }else if (userType == "admin") {
                history.push(`/admin`)
            }else if (userType == "patient" ) {
                 history.push(`/patientPanel`)
            }
            setIsLoading(false)
        }else {
            setUserType("")
            setIsLoading(false)
        }
    }, [])
    return (
        <div>
            {
                loading
                ?
                <h1>Loading...</h1>
                :
                <>
                    {
                        userType 
                        ?
                        <>
                            {
                                userType  == "doctor" && {
                                    
                                }
                            }
                            {
                                userType  == "patient" && <PatientPanel/> 
                            }
                            {
                                userType  == "admin" && <Admin/> 
                            }
                        </>
                        :
                        <h1>No Content</h1>
                    }
                </>
            }
        </div>
    )
}

export default Dashboad
