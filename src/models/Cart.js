const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
    // Basic
    product: [String],

    quantity: {
        type: String,
        required: [true, "quantity is Required"],
        trim: true,
        lowercase: true,
    },
    price: [{
        type: Number,
        required: [true, "price is Required"],
    }],
    
}, {
    timestamps: true
});

const Cartitem = mongoose.model("Cartitem", cartItemSchema) // collection

const cartSchema = new mongoose.Schema({
    // Basic
    user: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],
    
   items: [{type: mongoose.Schema.Types.ObjectId,
        ref: "Cartitem"}],
   
    totalPrice: {
       type : Number ,
       required : true
    },
   
}, {
    timestamps: true
});

const Cart = mongoose.model("Cart", cartSchema) // collection

module.exports = {Cart , Cartitem};