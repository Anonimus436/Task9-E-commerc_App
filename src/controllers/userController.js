const {User , Address} = require("../models/User");

 class UserController{

      async showAll(req, res) {
            const users = await User.find()

            return res.status(200).json({
                success: true,
                data: users
            });
    }

    async showById(req, res) {
            const { id } = req.params;

            const users = await User.findById(id)
                
            return res.status(200).json({
                success: true,
                data: users
            });
    }


     async update(req, res) {
                const { id } = req.params;
    
                const  { name, password, email , avatar , phone } = req.body;
    
                const updateuser = await User.findById(id);
    
                if(!updateuser) {
                    return res.status(404).json({
                        success: false,
                        data: null,
                    });
                }
    
                const newupdate = await User.findByIdAndUpdate(
                    id, 
                     { name, password, email , avatar , phone },
                    { new: true }
                );
    
                return res.status(201).json({
                    success: true,
                    data: newupdate
                });
            
        }
    
        
        async changeRole(req , res) {
            const {id} = req.params ;
            const userrole = await User.findById(id)
            if(!userrole){
               return res.status(404).json({success : false , user : null})
            }
            const {userroleChange} = req.body ;
            userrole.role = {userroleChange} ;
            return res.status(200).json({message : "the role of user change successfully"})
        }
    

         async AddAddress(req, res) {
                const { id } = req.params;
    
                const updateUserAddress = await User.findById(id);
    
                if(!updateUserAddress) {
                    return res.status(404).json({
                        success: false,
                        data: null,
                    });
                }
    
 
                const  {street , city , state , zipCode , country } = req.body;
 
                const addadress = await Address.create( {street , city , state , zipCode , country });
     
               return res.status(201).json({
                success: true,
                data: addadress
                 });
            }


 }
 module.exports = new UserController() ;