require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = () =>{

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

mongoose.connect(MONGO_URL)
    .then(res => {
        console.log("Connected to database done")
    })
    .catch(err => {
        console.log("Error:", err.message)
    })

}

module.exports = connectDB ;