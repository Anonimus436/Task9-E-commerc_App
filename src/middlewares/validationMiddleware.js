const {validationResult} = require("express-validator") ;
const validate = (req , res , next) => {
    const errors = validationResult(req) ;
    if(!errors.isEmpty()){
        return res.status(400).json({Success : false , message : "Error Validation" ,
            errors : errors.array().map(err => ({
                field : err.path ,
                message : err.msg ,
                value : err.value
            })) // end map
        }) // end json
    } // end if
    next() ;
} // end function

module.exports = validate ; 