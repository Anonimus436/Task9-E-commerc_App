const mongoose = require("mongoose");

const orderItemSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "name is required"]
    },
    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true 
    }],
    quantity: {
        type: Number, 
        required: [true, "quantity is Required"],
    },
    price: {
        type: Number,
        required: [true, "price is Required"],
    },
    image: [String]    
});


const orderSchema = new mongoose.Schema({
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true 
    },
    items: [orderItemSchema], 

    shippingAddress: {
        type: String,
        required: [true, "shippingAddress is Required"],
    },
    
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    
    paymentMethod: {   
        type: String,
        required: [true, "paymentMethod is Required"]
    },
    
    paymentResult: {
        type: String 
    },

    itemsPrice: {
        type: Number,
        required: true 
    },
    
    taxPrice: {
        type: Number,
        required: true 
    },
    
    shippingPrice: {
        type: Number,
        required: true 
    },

    totalPrice: {
        type: Number,
        required: true 
    },

    isPaid: { 
        type: Boolean, 
        default: false 
    },

    paidAt: Date,

    isDelivered: { 
        type: Boolean, 
        default: false 
    },

    deliveredAt: Date 
}, {
    timestamps: true
});


const Order = mongoose.model("Order", orderSchema);
const OrderItem = mongoose.model("OrderItem", orderItemSchema);   

module.exports = { Order, OrderItem }; 
