const mongoose = require("mongoose");

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
    name: {
        type: String,
        required: [true, "Name is Required"],
        trim: true,
        maxlength: 50,
        minlength: 2
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        lowercase: true,
        unique: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid Email"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        minlength: 8
    },
    // Authorization
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "user"
    },
    // Verifyng
    isVerified: {
        type: Boolean,
        default: false
    },

    isVerifiedToUpdate : {
        type: Boolean,
        default: false
    } , 
    // Locked after many failed Attempts
    isLocked: {
        type: Boolean,
        default: false
    },
    lockedUntil: Date,
    failedLoginAttempts: {
        type: Number,
        default: 0
    },
    
    addresses : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address'}] ,

    avatar : [String] ,
    
    phone : {
        type : Number ,
        required : [true , "Phone is required"] ,
        unique : true
    }

}, {
    timestamps: true
});

const User = mongoose.model("User", userSchema) // collection

module.exports = {User , Address};