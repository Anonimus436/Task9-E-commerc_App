const express = require("express") ;
const router = express.Router();
const cartController = require("../controllers/cartController") ;
const asyncHandler = require("../utils/asyncHandler");

// GET 
router.get("/:id" , asyncHandler(cartController.showById) ) ;

// POST 
router.post("/addUserCart/:id" , asyncHandler(cartController.addusercart));
router.post("/createItemCart" , asyncHandler(cartController.createitemcart));
router.post("/addItemToCart/:id" , asyncHandler(cartController.addItemCart));


// PUT 
router.put("/updateItemCart/:id" , asyncHandler(cartController.createitemcart));


// DELETE 
router.delete("/removeItemFromCart/:id" , asyncHandler(cartController.removeItemFCart) );
router.delete("/removeItemCart/:id" , asyncHandler(cartController.removeCartItem) );
router.delete("/removeCart/:id" , asyncHandler(cartController.removeCart) );


module.exports = router ;