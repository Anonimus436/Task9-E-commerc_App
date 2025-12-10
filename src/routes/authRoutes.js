const express = require("express") ;
const router = express.Router();
const authController = require("../controllers/authController") ;
const {requireAuth , auhtorize} = require("../middlewares/auth");
const {loginLimiter} = require("../middlewares/rateLimitMiddleware") ;
const {addNewAuthValidation} = require("../validation/authValidation") ;
const asyncHandler = require("../utils/asyncHandler") ;
// POST 
router.post("/register" , [addNewAuthValidation] , asyncHandler(authController.register) )
router.post("/login" , [loginLimiter , addNewAuthValidation] , asyncHandler(authController.login))
router.post("/logout" ,[requireAuth] , asyncHandler(authController.logout))
router.post("/refresh" , asyncHandler(authController.refreshToken))
router.post("/forgot-password" , [requireAuth , auhtorize("user")] , asyncHandler(authController.askToUpdatePassword));


// PUT
router.put("/update-password" ,  [requireAuth , auhtorize("user")]  ,  asyncHandler(authController.updatePassword))
router.put("/verify-email/:token" ,  asyncHandler(authController.verifyToUpdatePassword))

module.exports = router ;