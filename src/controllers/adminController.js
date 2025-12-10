const {User , Address} = require("../models/User");
const Product = require("../models/Product");
const Category = require("../models/Category");
const {Cart , Cartitem} = require("../models/Cart");

class SuperAdminController {
    
     async addUser(req, res) {
            const { name, password, email, addresses , role , avatar , phone } = req.body;

            const adduser = await User.create( { name, password, email, addresses , role , avatar , phone });

            return res.status(201).json({
                success: true,
                data: adduser
            });
    }


    async deleteUser(req, res) {
        
            const { id } = req.params;

            await User.findByIdAndDelete(id);

            return res.status(200).json({
                message: "Deleted User Successfully",
            })
        
    }
     
    
     async AddCategory(req, res) {

                         const { id } = req.params;
                         const addcategoryproduct = await Product.findById(id);
             
                         if(!addcategoryproduct) {
                             return res.status(404).json({
                                 success: false,
                                 data: null,
                             });
                         }
         
                         const  {name , description , images} = req.body;
                         const addcategory = await Category.create({name , description , images});
              
                        return res.status(201).json({
                         success: true,
                         data: addcategory
                          });
                  
            }
     
}
module.exports = new SuperAdminController() ;