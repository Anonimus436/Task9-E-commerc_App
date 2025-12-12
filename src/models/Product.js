const mongoose = require("mongoose");
const Category = require("./Category");
const paginatePlugin = require("../utils/apiFeatures");

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
   
    stock: { type: Boolean, default: false },
   
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

productSchema.plugin(paginatePlugin) ;

const Product = mongoose.model("Product", productSchema) // collection

module.exports = Product;