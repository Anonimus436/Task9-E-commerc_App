const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    // Basic
   user: [{type : mongoose.Schema.Types.ObjectId , ref : "Product"}] , 

    product: [{type : mongoose.Schema.Types.ObjectId , ref : "User"}],

    rating: {
       type : Number ,
       required : true ,
    },
    
    comment : {
        type : String ,
       required : true ,
    },

    images : [String]
    
});

const Review = mongoose.model("Review", reviewSchema) // collection
module.exports = Review ;
