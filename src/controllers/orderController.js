const {Order  , OrderItem} = require("../models/Order");
const product = require("../models/Product");
const User = require('../models/User');


class OrderController {

async  createOrder(req, res) {
  
    const { name, quantity, image, price, shippingAddress,
            paymentMethod, taxPrice, shippingPrice, paymentResult, productId } = req.body;

    const userId = req.user.id;

    const orderItem = {
      name,
      quantity,
      image,
      price,
      product: productId
    };

    const itemsPrice = price * quantity;
    const totalPrice = itemsPrice + taxPrice + shippingPrice;

    const order = await Order.create({
      user: userId,
      orderItems: [orderItem],   
      shippingAddress,
      paymentMethod,
      paymentResult,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    });

    // await sendMessage({
    //   from: "",
    //   to: req.user.email,
    //   subject: "Order Confirmation",
    //   text: `Your order has been created successfully. Order ID: ${order.id}`
    // });

    res.status(201).json({ success: true, order });
}

async addUserOrder(req , res){
    const{id} = req.params ;
    const checkUserOrder = await Order.findById(id);
    if(!checkUserOrder){
        return res.status(201).json({Success : false , data : null})
    }
    const {userId} = req.body ;
    checkUserOrder.user = [...checkUserOrder.user , userId]
    await checkUserOrder.save();
    return res.status(201).json({Success : true , data : checkUserOrder})
}

async addProductItemOrder(req , res){
    const{id} = req.params ;
    const checkProductOrder = await OrderItem.findById(id);
    if(!checkProductOrder){
        return res.status(201).json({Success : false , data : null})
    }
    const {productorederId} = req.body ;
    checkProductOrder.user = [...checkProductOrder.user , productorederId]
    await checkProductOrder.save();
    return res.status(201).json({Success : true , data : checkProductOrder})
}


async getUserOrders(req, res) {
    const {id} = req.params;
    const userId = await User.findById(id)
        const orders = await Order.find({ user: id }).populate('items.product');
        res.status(200).json({ success: true, orders });
}


async getOrderById(req, res) {
    const { id } = req.params;

        const order = await Order.findById(id).populate('items.product');

        if (!order) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        res.status(200).json({ success: true, order });
}


async  updateOrderStatus(req, res) {
  const { id } = req.params;
  const { status } = req.body; 

  try {
    const isDelivered = status === 'delivered';

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      {
        isDelivered,
        deliveredAt: isDelivered? new Date(): null
      },
      {
        new: true,        
      }
    );

    if (!updatedOrder) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    res.status(200).json({ success: true, message: 'Order status updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error', error: error.message });
  }
}

async getAllOrders(req, res) {
    try {
        const orders = await Order.find().populate('user', 'name email'); // يمكنك إضافة المزيد من التفاصيل حسب الحاجة
        res.status(200).json({ success: true, orders });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}


}
module.exports = new OrderController() ;