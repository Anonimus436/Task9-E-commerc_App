const express = require("express") ;
const router = express.Router();
const userController = require("../controllers/userController") ;
const {requireAuth ,    auhtorize} = require("../middlewares/auth") ;
const {addNewUserValidation , getByIdValidate} = require("../validation/userValidation") ;
const asyncHandler = require("../utils/asyncHandler")
// GET 
router.get("/profile" , [getByIdValidate] , asyncHandler(userController.showById)) ;
router.get("/admin/all" , [requireAuth ,    auhtorize("superadmin")] , asyncHandler(userController.showAll));


// PUT 
router.put("/profile" , [addNewUserValidation] , asyncHandler(userController.update)) ;
router.put("/address/:id" , asyncHandler(userController.AddAddress));
router.put("/:id/role" , [requireAuth ,    auhtorize("superadmin")] , asyncHandler(userController.changeRole));
 
module.exports = router ;