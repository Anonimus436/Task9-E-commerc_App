const {body, param} = require("express-validator") ;
const User = require("../models/User");

const addNewUserValidation = [
    
     body("token")
     .isString()
     .withMessage("name must be string").bail() ,

     body("type")
     .isString()
     .withMessage("password must be string").bail() ,

]

const getByIdValidate = [
    param("id")
    .isString().withMessage("Id must be string")
    .isMongoId().withMessage("Invalid Id Format")
]

module.exports = {addNewUserValidation , getByIdValidate} ;
