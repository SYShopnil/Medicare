const bloodBankSchemaValidation = require("../../../validation/Service/bloodBankService");
const BloodBankService = require("../../model/Service/BloodBank/blodBank");

const createBloodBankServiceController = async (req, res) => {
  try {
    const { error } = bloodBankSchemaValidation.validate(req.body); //validated the blood bank service schema  validation
    if (error) {
      //if schema validation error then it will execute
      res.json({
        message: "Joi Validation error",
        error,
      });
    } else {
      const { bloodGroup, availableAmount } = req.body.stockInfo; //get the blood group from body
      const isExistBloodGroup = await BloodBankService.find({
        "stockInfo.bloodGroup": bloodGroup.toUpperCase(),
        // "others.isDelete": false,
        // "others.isActive": true,
      }); //check that if blood bank exist or not create
      if (isExistBloodGroup.length == 0) {
        //if the blood bank service dont exist then it will execute
        const newBloodBankService = new BloodBankService({
          ...req.body,
          "stockInfo.bloodGroup": bloodGroup.toUpperCase()
        }); //create a instance of blood bank service schema
        const saveBloodBankService = await newBloodBankService.save(); //save the new blood bank service schema
        if (saveBloodBankService) {
          res.status(201).json({
            message: "New BloodBank service is created successfully",
            data: saveBloodBankService,
          });
        } else {
          res.json({
            message: "Blood bank service creation failed",
          });
        }
      } else {
        if (isExistBloodGroup[0].others.isDelete == true ) { //if the exist blood group is deleted already then it will execute 
          const updateBloodBankServiceInfo = await BloodBankService.updateOne(
            {
              "stockInfo.bloodGroup": bloodGroup.toUpperCase()
            }, //query
            {
              $set: {
                "stockInfo.availableAmount": availableAmount,
                "others.isDelete": false,
                "others.isActive": true,
              },
              $currentDate: {
                "modificationInfo.updatedAt": true,
              },
            }, //update
            { multi: true } //option
          ); //update the blood bank info
          if (updateBloodBankServiceInfo.nModified != 0) {
            res.status(202).json({
              message: "Blood Bank service Update successfully",
            });
          } else {
            res.json({
              message: "Blood Bank service update failed",
            });
          }
        }else {
          const updateBloodBankServiceInfo = await BloodBankService.updateOne(
            {
              "stockInfo.bloodGroup": bloodGroup.toUpperCase(),
              "others.isDelete": false,
              "others.isActive": true,
            }, //query
            {
              $inc: {
                "stockInfo.availableAmount": availableAmount,
              },
              $currentDate: {
                "modificationInfo.updatedAt": true,
              },
            }, //update
            { multi: true } //option
          ); //update the blood bank info
          if (updateBloodBankServiceInfo.nModified != 0) {
            res.status(202).json({
              message: "Blood Bank service Update successfully",
            });
          } else {
            res.json({
              message: "Blood Bank service update failed",
            });
          }
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

//update blood bank service by id controller
const updateBloodBankServiceByIdController = async (req, res) => {
  try {
    const { id } = req.params; //get the id from params
    if (id) {
      const updateBloodBankServiceInfo = await BloodBankService.updateOne(
        {
          _id: id,
          "others.isDelete": false,
          "others.isActive": true,
        }, //query
        {
          // $inc: {
          //   "stockInfo.availableAmount": req.body.stockInfo.availableAmount,
          // },
          $set: req.body,
          $currentDate: {
            "modificationInfo.updatedAt": true,
          },
        }, //update
        { multi: true } //option
      ); //update the blood bank info
      if (updateBloodBankServiceInfo.nModified != 0) {
        res.status(202).json({
          message: "Blood Bank service Update successfully",
        });
      } else {
        res.json({
          message: "Blood Bank service update failed",
        });
      }
    } else {
      res.json({
        message: "Blood Bank Service object id is required",
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

//create a blood bank service
// const createBloodBankServiceController = async (req, res) => {
//   try {
//     const { error } = bloodBankSchemaValidation.validate(req.body); //validated the blood bank service schema  validation
//     if (error) {
//       //if schema validation error then it will execute
//       res.json({
//         message: "Joi Validation error",
//         error,
//       });
//     } else {
//       const { bloodGroup } = req.body.stockInfo;
//       console.log(bloodGroup);
//       //   console.log(bloodGroup.toUpperCase());
//       const newBloodBankService = new BloodBankService({
//         ...req.body,
//         bloodGroup: bloodGroup.toUpperCase(),
//       }); //create a instance of blood bank service schema
//       const saveBloodBankService = await newBloodBankService.save(); //save the new blood bank service schema
//       if (saveBloodBankService) {
//         res.status(201).json({
//           message: "New BloodBank service is created successfully",
//           data: saveBloodBankService,
//         });
//       } else {
//         res.json({
//           message: "Blood bank service creation failed",
//         });
//       }
//     }
//   } catch (err) {
//     console.log(err);
//     res.json({
//       message: err.message,
//       err,
//     });
//   }
// };

//update blood bank service by id controller
// const updateBloodBankServiceByIdController = async (req, res) => {
//   try {
//     const { id } = req.params; //get the id from params
//     if (id) {
//       const updateBloodBankServiceInfo = await BloodBankService.updateOne(
//         {
//           _id: id,
//           "others.isDelete": false,
//           "others.isActive": true,
//         }, //query
//         {
//           $set: req.body,
//           $currentDate: {
//             "modificationInfo.updatedAt": true,
//           },
//         }, //update
//         { multi: true } //option
//       ); //update the blood bank info
//       if (updateBloodBankServiceInfo.nModified != 0) {
//         res.status(202).json({
//           message: "Blood Bank service Update successfully",
//         });
//       } else {
//         res.json({
//           message: "Blood Bank service update failed",
//         });
//       }
//     } else {
//       res.json({
//         message: "Blood Bank Service object id is required",
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

//delete A blood Bank service by id controller
const deleteBloodBankServiceById = async (req, res) => {
  try {
    const { id } = req.params; //get the id from params
    if (id) {
      const findBloodService = await BloodBankService.findOne({
        _id: id,
        "others.isDelete": false,
        "others.isActive": true,
      }); //find the blood bank is exist or not
      if (findBloodService) {
        const { bloodGroup } = findBloodService.stockInfo;
        const updateBloodBankServiceInfo = await BloodBankService.updateOne(
          {
            _id: id,
            "others.isDelete": false,
            "others.isActive": true,
          }, //query
          {
            $set: {
              "others.isDelete": true,
              "others.isActive": false,
            },
            $currentDate: {
              "modificationInfo.updatedAt": true,
            },
          }, //update
          { multi: true } //option
        ); //update the blood bank info
        if (updateBloodBankServiceInfo.nModified != 0) {
          res.status(202).json({
            message: `Blood Bank service ${bloodGroup} blood group Update successfully`,
          });
        } else {
          res.json({
            message: "Blood Bank service update failed",
          });
        }
      } else {
        res.json({
          message: "Blood Service not available",
        });
      }
    } else {
      res.json({
        message: "Blood Bank Service object id is required",
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

//make a blood service request
const bloodBankServiceRequestController = async (req, res) => {
  try {
    const { _id, amount } = req.body; //get the data from body
    if (_id) {
      //check that is this blood group object id is available or not
      const reduceAmount = +amount; //store and conver it to number
      const findBloodService = await BloodBankService.findOne({
        _id,
        "others.isDelete": false,
        "others.isActive": true,
      }).select("stockInfo.availableAmount -_id");
      if (findBloodService) {
        const { availableAmount } = findBloodService.stockInfo; //get the available amount from the service
        if (availableAmount >= reduceAmount) {
          //check that is requested amount of blood is available or not
          const findServiceAndReduceAmount = await BloodBankService.updateOne(
            //find the service and reduce what amount is wasted
            {
              _id,
              "others.isDelete": false,
              "others.isActive": true,
            }, //querry
            {
              $inc: {
                "stockInfo.availableAmount": -reduceAmount,
              },
              $currentDate: {
                "modificationInfo.updatedAt": true,
              },
            }, //update
            { multi: true } //option
          );
          if (findServiceAndReduceAmount.nModified != 0) {
            res.status(202).json({
              message: "Blood Service is successfully accepted",
            });
          } else {
            res.json({
              message: "Service Update failed",
            });
          }
        } else {
          res.json({
            message: "Request Amount of blood is not available",
          });
        }
      } else {
        res.json({
          message: "Blood Service not found",
        });
      }
    } else {
      res.json({
        message: "Blood Group object id is required",
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

//add blood in service controller
const addBloodInServiceController = async (req, res) => {
  try {
    const { id } = req.params; //get the data from params
    const { amount } = req.body; //get the amount from body
    if (id) {
      const findBloodService = await BloodBankService.findOne({
        _id: id,
        "others.isDelete": false,
        "others.isActive": true,
      }).select("stockInfo.availableAmount stockInfo.bloodGroup -_id"); //get the available amount of requested blood
      if (findBloodService) {
        //check that is the blood  service available  or not
        const addAmount = +amount; //store the amount
        const { bloodGroup } = findBloodService.stockInfo; //get the blood group of requested service
        const addAmountToBloodService = await BloodBankService.updateOne(
          //add how many amount we want to add to the respected service
          {
            _id: id,
            "others.isDelete": false,
            "others.isActive": true,
          }, //query
          {
            $inc: {
              "stockInfo.availableAmount": addAmount,
            },
            $currentDate: {
              "modificationInfo.updatedAt": true,
            },
          }, //update
          { multi: true } //option
        );
        if (addAmountToBloodService.nModified != 0) {
          res.status(202).json({
            message: `${amount} litter blood has been successfully added to ${bloodGroup} group`,
          });
        } else {
          res.json({
            message: "Blood Amount add failed",
          });
        }
      } else {
        res.json({
          message: "Blood Service not found",
        });
      }
    } else {
      res.json({
        message: "Blood Object Id is required",
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      message: err.message,
    });
  }
};

//show all blood bank service
const showALlBloodBankServiceController = async (req, res) => {
  try {
    const findBloodBankService = await BloodBankService.find(
      //find the blood bank service
      {
        "others.isActive": true,
        "others.isDelete": false,
      }
    ).select(`-modificationInfo -others`);

    if (findBloodBankService) {
      res.status(202).json({
        message: "Blood bank service found",
        data: findBloodBankService,
      });
    } else {
      res.json({
        message: "No blood bank service found",
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

//get blood service by group name
const getBloodServiceByGroupNameController = async (req, res) => {
  try {
    const { group } = req.params; //get the group name from params
    if (group) {
      //if blood group is given in params it will execute
      const findGroup = await BloodBankService.findOne({
        "others.isActive": true,
        "others.isDelete": false,
        "stockInfo.bloodGroup": group,
      }).select("-others -modificationInfo");
      if (findGroup) {
        res.status(202).json({
          message: `${group} blood group found`,
          data: findGroup,
        });
      } else {
        res.json({
          message: "Requested Blood Group service not available at this moment",
        });
      }
    } else {
      res.json({
        message: "Blood group input required in the url params",
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

//get blood service by object id
const getBloodServiceByObjectIdController = async (req, res) => {
  try {
    const { id } = req.params; //get the group name from params
    if (id) {
      //if blood group is given in params it will execute
      const findGroup = await BloodBankService.findOne({
        "others.isActive": true,
        "others.isDelete": false,
        _id: id,
      }).select("-others -modificationInfo");
      if (findGroup) {
        // console.log(findGroup);
        res.status(202).json({
          message: `${findGroup.stockInfo.bloodGroup} blood group found`,
          data: findGroup,
        });
      } else {
        res.json({
          message: "Requested Blood Group service not available at this moment",
        });
      }
    } else {
      res.json({
        message: "Object id required in the url params",
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
//export part
module.exports = {
  createBloodBankServiceController,
  updateBloodBankServiceByIdController,
  deleteBloodBankServiceById,
  bloodBankServiceRequestController,
  addBloodInServiceController,
  showALlBloodBankServiceController,
  getBloodServiceByGroupNameController,
  getBloodServiceByObjectIdController,
};
