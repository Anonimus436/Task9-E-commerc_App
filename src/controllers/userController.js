const {User , Address} = require("../models/User");
// const Auth = require("../models/Auth");

 class UserController{

       async addUser(req, res) {
                  const { avatar , phone } = req.body;
                  const adduser = await User.create( { avatar , phone });
                  return res.status(201).json({
                      success: true,
                      data: adduser
                  });
          }

        async addAuthUserAndAddress(req , res){
            const {id} = req.params ;
            const userId = await User.findById(id);
            if(!userId){
                return res.status(400).json({Success : false , data : null})
            }
            const {AuthId , AddressId} = req.body ;
            userId.AuthUser = [...userId.AuthUser , AuthId];
            userId.address = [...userId.address , AddressId] ;
            await userId.save();
            return res.status(201).json({message : "Auth And Adderss Add Successfully" , data : userId})
        }

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
    
                const  {avatar , phone } = req.body;
    
                const updateuser = await User.findById(id);
    
                if(!updateuser) {
                    return res.status(404).json({
                        success: false,
                        data: null,
                    });
                }
    
                const newupdate = await User.findByIdAndUpdate(
                    id, 
                     {  avatar , phone },
                    { new: true }
                );
    
                return res.status(201).json({
                    success: true,
                    data: newupdate
                });
            
        }
    
         async updateAuthAndAddress(req, res) {
                const { id } = req.params;
    
                const  {AuthId , AddressId } = req.body;
    
                const updateuser = await User.findById(id);
    
                if(!updateuser) {
                    return res.status(404).json({
                        success: false,
                        data: null,
                    });
                }
                
               updateuser.AuthUser = [...updateuser.AuthUser , AuthId];
               updateuser.address = [...updateuser.address , AddressId];

                return res.status(200).json({
                    success: true,
                    data: updateuser
                });
            
        }

        
        async changeRole(req , res) {
            const {id} = req.params ;
            const userrole = await Auth.findById(id)
            if(!userrole){
               return res.status(404).json({success : false , user : null})
            }
            const {userroleChange} = req.body ;
            userrole.role = {userroleChange} ;
            return res.status(200).json({message : "the role of user change successfully"})
        }
    

         async createAddress(req, res) {
                const  {street , city , state , zipCode , country } = req.body;
                const addadress = await Address.create( {street , city , state , zipCode , country });
               return res.status(201).json({
                success: true,
                data: addadress
                 });
            }

        async AddAdress (req, res){
            const{id} = req.params ;
            const checkuser = await User.findById(id);
            if(!checkuser){
                return res.status(400).json({success : false , data : null})
            }
            const {addressId} = req.body ;
            checkuser.address = [...checkuser.address , addressId];
            await checkuser.save();
            return res.status(201).json({success : true , data : checkuser})
        }


 }
 module.exports = new UserController() ;