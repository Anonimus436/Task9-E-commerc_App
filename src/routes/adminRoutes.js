const express = require("express") ;
const router = express.Router();
const adminController = require("../controllers/adminController") ;
const {addNewUserValidation , getByIdValidate} = require("../validation/userValidation")
const {requireAuth ,    auhtorize} = require("../middlewares/auth") ;
const asyncHandler = require("../utils/asyncHandler")
// POST
router.post("/" , [addNewUserValidation , requireAuth ,    auhtorize("superadmin")] , asyncHandler(adminController.addUser)) ;
router.post("/addcategory/:id" , [requireAuth ,    auhtorize("superadmin")] , asyncHandler(adminController.AddCategory))

// DELETE 
router.delete("/deleteuser" , [getByIdValidate , requireAuth ,    auhtorize("superadmin")] , asyncHandler(adminController.deleteUser))

module.exports = router ;