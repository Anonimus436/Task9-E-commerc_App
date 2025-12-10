const {body} = require("express-validator") ;
const { Order , OrderItem } = require("../models/Order");

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

     body("price")
     .isNumeric()
     .withMessage("price must be number").bail() ,

]

module.exports = {addNewAuthValidation} ;
