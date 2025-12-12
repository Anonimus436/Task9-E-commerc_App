const {User , Address}  = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const {Cart , Cartitem}  = require("../models/Cart");
const Auth = require("../models/Auth")

class SuperAdminController {
    
    async deleteUser(req, res) {
        
            const { id } = req.params;
            const deleteusernre =  await User.findByIdAndDelete(id);
            return res.status(200).json({
                message: "Deleted User Successfully", data : deleteusernre
            })
    }
     

    async deletAuth(req , res){
         const { id } = req.params;

       const removeUser =  await Auth.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Deleted User completely Successfully", data : removeUser 
            })
    }    

}
module.exports = new SuperAdminController() ;