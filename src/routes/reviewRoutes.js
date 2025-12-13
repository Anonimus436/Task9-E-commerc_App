const express = require("express") ;
const router = express.Router();
const reviewController = require("../controllers/reviewController") ;
const asyncHandler = require("../utils/asyncHandler");

// POST 
router.post("/:id/addreviews/imagelocal" , asyncHandler(reviewController.addReviewWithImagesByMulter) );
router.post("/:id/addreviews/imagecloud" , asyncHandler(reviewController.addReviewWithimagesByCloudinary) );
router.post("/:id/adduserreviews/:id" , asyncHandler(reviewController.addUserReview));

// GET 
router.get("/:productId/getreviews" , asyncHandler(reviewController.getProductReview) ) ;

// PUT
router.put("/:id" , asyncHandler(reviewController.updateProductReview));

// DELETE
router.delete("/:id" , asyncHandler(reviewController.deleteReview))

module.exports = router ;