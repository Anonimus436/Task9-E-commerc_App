const {Cart , Cartitem} = require("../models/Cart");
const Product = require("../models/Product");
const {User , Address} = require("../models/User");
const { addReviewWithimagesByCloudinary } = require("./reviewController");

class CategoryController {
    
    async showById(req, res) {
                const { id } = req.params ;
                const cartcheck = await Cart.findById(id);
                if(!cartcheck){
                     return res.status(200).json({Success : false , data : null})
                }
                return res.status(200).json({Success : true , data : cartcheck})
        }

   async addusercart(req, res) {
    
                const {id} = req.params;
    
                const CartId = await Cart.findById(id);
    
                if(!CartId) {
                    return res.status(404).json({
                        success: false,
                        data: null,
                    });
                }
    
                const { userId } = req.body;
    
                CartId.user = [...CartId.user, userId];
    
                await CartId.save();
    
                return res.status(201).json({
                    success: true,
                    data: CartId ,
                });
            
        }


       async createitemcart(req, res) {
           const { quantity, price } = req.body;

           const newItem = await Cartitem.create({ quantity, price});

           return res.status(201).json({
               success: true,
               data: newItem
           });
        }

 
        async addProductTitemCart (req , res){
            const{id} = req.params;
            const procart = await Cartitem.findById(id);
            if(!procart){
                return res.status(400).json({Success : false , Data : null})
            }
            const {cateitemId} = req.body ;
            procart.product = [...procart.product , cateitemId] ;
            await procart.save();
            return res.status(200).json({Success : true , data : procart})
        }
        
             async createTotalPriceCart(req , res) {
        
               const cartItems = await Cartitem.find().select("price");
        
               const sum = cartItems.reduce((acc, item) => acc + item.price, 0);
        
               const cart = await Cart.findOne(); 

               if (!cart) {
                   throw new Error('Cart not found');
               }
        
               cart.totalPrice = sum;
        
               await cart.save();
        
                return res.status(200).json({message : "get total price successfully"})
          }
        
       

          async addItemCart(req, res) {
    
                const {id} = req.params;
    
                const CarttId = await Cart.findById(id);
    
                if(!CarttId) {
                    return res.status(404).json({
                        success: false,
                        data: null,
                    });
                }
    
                const { cartitemId } = req.body;
    
                CarttId.items = [...CarttId.items, cartitemId];
    
                await CarttId.save();
    
                return res.status(200).json({
                    success: true,
                    data: CarttId ,
                });   
        }


        async update(req, res) {
           const { id } = req.params;
           const { quantity, price } = req.body;

           const searchItem = await Cartitem.findById(id);
           if (!searchItem) {
               return res.status(404).json({
                   success: false,
                   data: null,
                   message: 'Cart item not found',
            });
           }

            const updatedItem = await Cartitem.findByIdAndUpdate(
             id,
            {
            quantity: quantity,  
            price: price, 
            },
            { new: true } 
        );

           return res.status(200).json({
           success: true,
           data: updatedItem
           });
    }


    
            async removeItemFCart(req, res) {
                 const { id } = req.params; 
                 const { cartitemId } = req.body; 

                   const cart = await Cart.findById(id);

                    if (!cart) {
                     return res.status(404).json({
                         success: false,
                         message: "Cart not found",
                          data: null,
                      });
                  }

                  const itemIndex = cart.items.indexOf(cartitemId);
                  if (!itemIndex) {
                      return res.status(404).json({
                          success: false,
                          message: "Item not found in cart",
                          data: null,
                      });
                  }

                  cart.items.splice(itemIndex, 1);

                  await cart.save();

                  return res.status(200).json({success: true,  data: cart });
    
   
        }

        
        async removeCartItem(req, res) {
                    const { id } = req.params;
        
                    const removItem = await Cartitem.findById(id);
        
                    if(!removItem) {
                        return res.status(404).json({
                            success: false,
                            data: null,
                        });
                    }
        
                    const deletedItem = await Cartitem.findByIdAndDelete(id, { new: true });

                    return res.status(200).json({
                        success: true,
                        data: deletedItem,
                    });
            }

            async removeCart(req, res) {
                    const { id } = req.params;
        
                    const removCart = await Cart.findById(id);
        
                    if(!removCart) {
                        return res.status(404).json({
                            success: false,
                            data: null,
                        });
                    }
        
                    const deletedCart = await Cartitem.findByIdAndDelete(id, { new: true });
                    
                    return res.status(200).json({
                        success: true,
                        data: deletedCart,
                    });
            }

}
module.exports = new CategoryController();