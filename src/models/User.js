const mongoose = require("mongoose");
const Auth = require("./Auth");

const addressSchema = new mongoose.Schema({
    // Basic
    street : {
        type : String ,
        required : [true , "name is required"]
    } ,

    city: {
            type : String ,
        required : [true , "name is required"]
        },

    state: {
        type : String ,
        required : [true , "name is required"]
    },

    zipCode: {
       type : String ,
        required : [true , "name is required"]
    },

    country : {
        type : String ,
        required : [true , "name is required"]
    } ,

    isDefault :  { type: Boolean, default: false }
    
});

const Address = mongoose.model("Address", addressSchema) // collection


const userSchema = new mongoose.Schema({
    // Basic
   
    Auth : [{
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Auth"
    }] ,

    avatar : [String] ,
    
    phone : {
        type : Number ,
        unique : true
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema) // collection

module.exports = {User , Address};