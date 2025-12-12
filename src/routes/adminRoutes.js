const express = require("express") ;
const router = express.Router();
const adminController = require("../controllers/adminController") ;
const {addNewUserValidation , getByIdValidate} = require("../validation/userValidation")
const {requireAuth ,    auhtorize} = require("../middlewares/auth") ;
const asyncHandler = require("../utils/asyncHandler")

// DELETE 
router.delete("/deleteuser/:id" , [getByIdValidate , requireAuth ,    auhtorize("superadmin")] , asyncHandler(adminController.deleteUser))
router.delete("/deleteauth/:id" , [getByIdValidate , requireAuth ,    auhtorize("superadmin")] , asyncHandler(adminController.deletAuth))


module.exports = router ;