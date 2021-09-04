const express = require('express');
const route = express.Router();

const authentication = require('../../../middleware/auth/authentication');
const authorization = require('../../../middleware/auth/authorization')

const {createAmbulanceServiceController,
    updateAmbulanceServiceByIdController,
    deleteAmbulanceServiceById,
    showAllAmbulanceServiceController} = require('../../controller/Service/ambulanceService')

//post 
route.post('/create', authentication, authorization(["admin"]), createAmbulanceServiceController)

//put
route.put('/update/:id', authentication, authorization(["admin"]), updateAmbulanceServiceByIdController)
route.put('/delete/temporary/:id', authentication, authorization(["admin"]), deleteAmbulanceServiceById)

//get
route.get('/get/all', showAllAmbulanceServiceController)
//export part 
module.exports = route