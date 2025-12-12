require("dotenv").config();
const Auth = require("../models/Auth");
const connectDB = require("../utils/connectDB")
const passwordService = require("../utils/passwordUtils") ;

const createAdminUser = async () => {
    try {

    await connectDB();
    const adminData ={
       email : process.env.SUPERADMIN_EMAIL  ,
       password : process.env.SUPERADMIN_PASS ,
       name: process.env.SUPERADMIN_NAME ,
       role : "superadmin" ,
       isVerified : true ,
    }
    const existedAdmin = await Auth.findOne({role : "superadmin"}) ;
    if(existedAdmin){
        console.error("Admin is already exist");
        process.exit(1);
    }
    await Auth.create({
        ...adminData ,
        password : await passwordService.hashPassword(adminData.password)
    })
    console.log("Super Admin is Created Successfully");
    process.exit(0);

    } catch(error) {
      console.error("Error Created Superadmin User :" , error.message) ;
      process.exit(1);
    }
}

createAdminUser();