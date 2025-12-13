const express = require("express") ;
const router = express.Router();
const productController = require("../controllers/productController") ;
const {requireAuth ,    auhtorize} = require("../middlewares/auth") ;
const {addNewProductValidation , getByIdValidate} = require("../validation/productValidation");
const asyncHandler = require("../utils/asyncHandler");
const uploadLocal = require("../middlewares/uploadMiddleware");
const multer = require("multer");
// GET 
router.get("/" , asyncHandler(productController.showAll));
router.get("/:id" , asyncHandler(productController.showById));
router.get("/categories" , asyncHandler(productController.showAllCategory));

// POST 
router.post("/local" , [requireAuth , auhtorize("superadmin") , addNewProductValidation , uploadLocal.single("image"),] , asyncHandler(productController.addProductWithImageByMulter));
router.post("/cloud" , [requireAuth , auhtorize("superadmin") , addNewProductValidation ,  multer().single("image"),] , asyncHandler(productController.addProductWithImageByCloudinary));
router.post("/categoryToProduct" , [requireAuth , auhtorize("superadmin")] , asyncHandler(productController.addCategoryToProduct));

// PUT 
router.put("/:id" , [requireAuth , auhtorize("superadmin") , addNewProductValidation , getByIdValidate] , asyncHandler (productController.update));

// DELETE 
router.delete("/:id" , [requireAuth , auhtorize("superadmin")] , asyncHandler(productController.remove)) ;

module.exports = router ;