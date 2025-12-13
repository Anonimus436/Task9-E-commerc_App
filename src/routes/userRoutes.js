const express = require("express") ;
const router = express.Router();
const userController = require("../controllers/userController") ;
const {requireAuth ,    auhtorize} = require("../middlewares/auth") ;
const {addNewUserValidation , getByIdValidate} = require("../validation/userValidation") ;
const asyncHandler = require("../utils/asyncHandler")
// GET 
router.get("/profile/:id" , [getByIdValidate] , asyncHandler(userController.showById)) ;
router.get("/admin/all" , [requireAuth ,    auhtorize("superadmin")] , asyncHandler(userController.showAll));

//POST
router.post("/adduser" , [requireAuth , auhtorize("superadmin")] , asyncHandler(userController.addUser));
router.post("/addauthuserandaddress/:id" , [requireAuth , auhtorize("superadmin")] , asyncHandler(userController.addAuthUserAndAddress)); 
router.post("/createAdress" , asyncHandler(userController.createAddress));
router.post("/addAddress" , asyncHandler(userController.AddAdress));

// PUT 
router.put("/updateprofile" , [addNewUserValidation] , asyncHandler(userController.update)) ;
router.put("/updateAuthAndAddress/:id" , [addNewUserValidation] , asyncHandler(userController.updateAuthAndAddress)) ;
router.put("/:id/role" , [requireAuth ,    auhtorize("superadmin")] , asyncHandler(userController.changeRole));
 
module.exports = router ;