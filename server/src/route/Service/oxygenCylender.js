const express = require("express");
const route = express.Router();

const authentication = require("../../../middleware/auth/authentication");
const authorization = require("../../../middleware/auth/authorization");

const {
  createOxygenCylenderService,
  //   updateOxygenCylenderByIdController,
  makeOxygenCylinderRequestController,
  deleteTemporaryOxygenCylenderByIdController,
  getAllOxygenServiceController,
} = require("../../controller/Service/oxygenCylender");

//post
// route.post('/create',authentication, authorization(["admin"]), createOxygenCylenderService)
route.post("/create", createOxygenCylenderService);

//put
// route.put(
//   "/update/:id",
//   authentication,
//   authorization(["admin"]),
//   updateOxygenCylenderByIdController
// );
route.put("/request/service", makeOxygenCylinderRequestController);
route.put(
  "/delete/temporary/:id",
  authentication,
  authorization(["admin"]),
  deleteTemporaryOxygenCylenderByIdController
);

//get
route.get("/get/all", getAllOxygenServiceController);

//export part
module.exports = route;
