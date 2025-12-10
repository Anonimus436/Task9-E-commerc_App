const mongoose = require("mongoose");
const Category = require("./Category");
const productSchema = new mongoose.Schema({
    // Basic
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
    },

    description: {
        type: String,
        required: [true, "description is Required"],
        trim: true,
        lowercase: true,
    },

    price: {
        type: Number,
        required: [true, "price is Required"],
    },
    
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category'}],
   
    images :  {
        type: [String], 
        required: true, 
    },
   
    stock: { type: Number, default: 0 },
   
    ratings:{
         type: Number,
         min : 20 ,
         max : 100
        },
    
    numReviews : { type: Number, default: 0 } ,

    features : [String],
    
    brand : {
       type : String ,
       required : true
    }

}, {
    timestamps: true
});

const Product = mongoose.model("Product", productSchema) // collection

module.exports = Product;