const {body, param} = require("express-validator") ;
const Product = require("../models/Product");

const addNewProductValidation = [
    
     body("name")
     .isString()
     .withMessage("name must be string").bail()
     .custom(async name => {
        const product = await Product.findOne({name});
        if(product){
            throw new Error("name is already exist")
        }
        return true ;
     }) ,

     body("description")
     .isString()
     .withMessage("description must be string").bail() ,

     body("price")
     .isNumeric()
     .withMessage("price must be number").bail() ,
     
     body("ratings")
     .isNumeric()
     .withMessage("ratings must be number").bail() ,

     
     body("numReviews")
     .isNumeric()
     .withMessage("numReviews must be number").bail() ,

     body("features")
     .isString()
     .withMessage("features must be string Array").bail() ,


     body("brand")
     .isString()
     .withMessage("brand must be string").bail() ,

]

const getByIdValidate = [
    param("id")
    .isString().withMessage("Id must be string")
    .isMongoId().withMessage("Invalid Id Format")
]

module.exports = {addNewProductValidation , getByIdValidate} ;
