const mongoose = require("mongoose");

const authSchema = new mongoose.Schema({
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
    // Info
    lastLogin: Date,
}, {
    timestamps: true
});

const Auth = mongoose.model("Auth", authSchema) // collection

module.exports = Auth;