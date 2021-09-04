const express = require('express');
const route = express.Router();

const authentication = require('../../../middleware/auth/authentication');
const authorization = require('../../../middleware/auth/authorization') 

const {createBloodBankServiceController,
    updateBloodBankServiceByIdController,
    deleteBloodBankServiceById,
    bloodBankServiceRequestController,
    addBloodInServiceController,
    showALlBloodBankServiceController,
    getBloodServiceByGroupNameController,
    getBloodServiceByObjectIdController} = require('../../controller/Service/bloodBankService')

//post 
route.post(`/create`,authentication, authorization(["admin"]),  createBloodBankServiceController) 
route.post(`/make/request`, authentication, authorization(["patient"]), bloodBankServiceRequestController) 


//put
route.put(`/update/:id`, authentication, authorization(["admin"]), updateBloodBankServiceByIdController) 
route.put(`/delete/temporary/:id`, authentication, authorization(["admin"]), deleteBloodBankServiceById) 
route.put(`/add/blood/:id`, authentication, authorization(["admin"]), addBloodInServiceController) 

//get 
route.get('/get/all', showALlBloodBankServiceController)
route.get('/get/service/:group', getBloodServiceByGroupNameController)
route.get('/get/service/by/:id', getBloodServiceByObjectIdController)

//export part 
module.exports = route