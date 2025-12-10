const {body} = require("express-validator") ;
const User = require("../models/User");

const addNewAuthValidation = [
    
     body("name")
     .isString()
     .withMessage("name must be string").bail()
     .custom(async title => {
        const book = await User.findOne({title});
        if(book){
            throw new Error("name is already exist")
        }
        return true ;
     }) ,

     body("email")
     .isString()
     .withMessage("email must be string").bail() ,

     body("password")
     .isString()
     .withMessage("password must be string").bail() ,

]

module.exports = {addNewAuthValidation} ;
