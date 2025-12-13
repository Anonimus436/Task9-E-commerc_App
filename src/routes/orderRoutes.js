const express = require("express") ;
const router = express.Router();
const orderController = require("../controllers/orderController") ;
const asyncHandler = require("../utils/asyncHandler");
const {requireAuth , auhtorize} = require("../middlewares/auth");

// POST 
router.post("/" , asyncHandler(orderController.createOrder));

// GET
router.get("/:id" , asyncHandler(orderController.getUserOrders) );
router.get("/:id" , asyncHandler(orderController.getOrderById));
router.get("/admin/all" , [requireAuth , auhtorize("superadmin")] , asyncHandler(orderController.getAllOrders));

//POST
router.post("/addUserOrder/:id" , asyncHandler(orderController.addUserOrder) );
router.post("/addProductOrder/:id" , asyncHandler(orderController.addProductItemOrder) );

// PUT 
router.put("/:id/status" , [requireAuth , auhtorize("superadmin")] , asyncHandler(orderController.updateOrderStatus) ) ;

module.exports = router ;