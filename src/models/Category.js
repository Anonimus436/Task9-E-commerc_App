const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
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
   
    images: [String],
   
    
}, {
    timestamps: true
});

const Category = mongoose.model("Category", categorySchema) // collection

module.exports = Category;