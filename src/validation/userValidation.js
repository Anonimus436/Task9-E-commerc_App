const {body, param} = require("express-validator") ;
const User = require("../models/User");

const addNewUserValidation = [
    
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

     body("avatar")
     .isArray(String)
     .withMessage("avatar must be Array string").bail() ,

     
     body("phone")
     .isNumeric()
     .withMessage("phone must be number").bail() ,
]

const getByIdValidate = [
    param("id")
    .isString().withMessage("Id must be string")
    .isMongoId().withMessage("Invalid Id Format")
]

module.exports = {addNewUserValidation , getByIdValidate} ;
