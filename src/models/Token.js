const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    // Basic
   user: [{
           type: mongoose.Schema.Types.ObjectId,
           ref: "User"
       }], 


    token: {
      type : String ,
      required : true 
    },
    
    type : {
      type : String ,
      required : true 
    },
    
    expiresAt : Date ,
    
} , {timestamps : true});

const Token = mongoose.model("Token", tokenSchema) // collection
module.exports = Token ;
