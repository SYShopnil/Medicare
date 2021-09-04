const oxygenCylenderSchemaValidation = require("../../../validation/Service/oxygenCylenderService");
const OxygenCylinderService = require("../../model/Service/OxygenCylender/oxygenCylender");

//create a oxygenCylender service
const createOxygenCylenderService = async (req, res) => {
  try {
    const { error } = oxygenCylenderSchemaValidation.validate(req.body); //validate the schema
    if (error) {
      res.json({
        message: "Joi Validation error",
        error,
      });
    } else {
      const checkExistService = await OxygenCylinderService.find({
        "other.isDelete": false,
        "other.isActive": true,
      }); //check that is there have any service exist or not
      if (checkExistService.length == 0) {
        //if there don't have any service exist in database then it will happen
        //create a new oxygen service
        const newService = new OxygenCylinderService(req.body); //create a instance
        const saveService = await newService.save(); //save
        if (saveService) {
          //if it is save in data base then it will execute
          res.status(201).json({
            message: "New Oxygen Cylinder service has been created",
            data: saveService,
          });
        } else {
          res.json({
            message: "Oxygen Service creation failed",
          });
        }
      } else {
        //if the oxygen cylender service exist then it will happen
        //update exist oxygen service
        // const {amount} = req.body //get the amount and update it
        const updateOxygenCylenderAmount =
          await OxygenCylinderService.updateOne(
            {
              "other.isDelete": false,
              "other.isActive": true,
            }, //query
            {
              $inc: {
                amount: req.body.amount,
              },
              $currentDate: {
                "modificationInfo.updatedAt": true,
              },
            }, //update
            { multi: true } //option
          );
        if (updateOxygenCylenderAmount.nModified != 0) {
          res.status(202).json({
            message: "Oxygen cylinder updated successfully",
          });
        } else {
          res.json({
            message: "Oxygen cylinder update failed",
          });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
      err,
    });
  }
};

// //update oxygenCylender service by id
// const updateOxygenCylenderByIdController = async (req, res) => {
//   try {
//     const { id } = req.params; //get the id from params
//     if (id) {
//       const { amount } = req.body; //get the amount and update it
//       const updateOxygenCylenderAmount = await OxygenCylinderService.updateOne(
//         {
//           _id: id,
//           "other.isDelete": false,
//           "other.isActive": true,
//         }, //query
//         {
//           $inc: {
//             amount: amount,
//           },
//           $currentDate: {
//             "modificationInfo.updatedAt": true,
//           },
//         }, //update
//         { multi: true } //option
//       );
//       if (updateOxygenCylenderAmount.nModified != 0) {
//         res.status(202).json({
//           message: "Oxygen cylinder updated successfully",
//         });
//       } else {
//         res.json({
//           message: "Oxygen cylinder update failed",
//         });
//       }
//     } else {
//       res.json({
//         message: "Oxygen cylender service object id is required",
//       });
//     }
//   } catch (err) {
//     console.log(err);
//     res.json({
//       message: err.message,
//       err,
//     });
//   }
// };

//make a oxygen cylinder service request
const makeOxygenCylinderRequestController = async (req, res) => {
  try {
    const { amount: inputAmount, _id } = req.body; //get the amount of oxygen
    const findOxygenServiceAvailable = await OxygenCylinderService.findOne({
      _id,
      "other.isDelete": false,
      "other.isActive": true,
    }); //find the service     }catch(err) {
    if (findOxygenServiceAvailable) {
      const { amount: leftAmount } = findOxygenServiceAvailable; //find the amount of oxygen  left
      if (leftAmount > inputAmount) {
        const reduceAmount = await OxygenCylinderService.updateOne(
          {
            _id: _id,
            "other.isDelete": false,
            "other.isActive": true,
          }, //query
          {
            $inc: {
              amount: -inputAmount,
            },
            $currentDate: {
              "modificationInfo.updatedAt": true,
            },
          }, //update
          { multi: true } //option
        );
        if (reduceAmount.nModified != 0) {
          res.status(202).json({
            message: "Oxygen service is successfully accepted",
          });
        } else {
          res.json({
            message: "Amount reduce failed",
          });
        }
      } else {
        res.json({
          message: "Requested amount is not in stock",
        });
      }
    } else {
      res.json({
        message: "Oxygen service not available",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
      err,
    });
  }
};

//delete oxygenCylender service by id
const deleteTemporaryOxygenCylenderByIdController = async (req, res) => {
  try {
    const { id } = req.params; //get the id from params
    if (id) {
      const updateOxygenCylenderAmount = await OxygenCylinderService.updateOne(
        {
          _id: id,
          "other.isDelete": false,
          "other.isActive": true,
        }, //query
        {
          $set: {
            "other.isDelete": true,
            "other.isActive": false,
          },
          $currentDate: {
            "modificationInfo.updatedAt": true,
          },
        }, //update
        { multi: true } //option
      );
      if (updateOxygenCylenderAmount.nModified != 0) {
        res.status(202).json({
          message: "Oxygen cylinder deleted temporary successfully",
        });
      } else {
        res.json({
          message: "Oxygen cylinder deleted temporary  failed",
        });
      }
    } else {
      res.json({
        message: "Oxygen cylinder service object id is required",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
      err,
    });
  }
};

//get all oxygen cylinder service controller
const getAllOxygenServiceController = async (req, res) => {
  try {
    const findOxygenCylinder = await OxygenCylinderService.findOne({
      "other.isDelete": false,
      "other.isActive": true,
    }).select(`-other
            -modificationInfo`);

    if (findOxygenCylinder) {
      res.status(202).json({
        message: "Oxygen cylinder found",
        data: findOxygenCylinder,
      });
    } else {
      res.json({
        message: "No Oxygen cylinder service found",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
      err,
    });
  }
};

module.exports = {
  createOxygenCylenderService,
  //   updateOxygenCylenderByIdController,
  makeOxygenCylinderRequestController,
  deleteTemporaryOxygenCylenderByIdController,
  getAllOxygenServiceController,
};
