const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    // Basic
   user: [String], 

    product: [String],

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
