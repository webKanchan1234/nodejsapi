const Order = require("../models/orderModel")
const User = require("../models/userModel")


exports.orderItems = async(req,res,next)=>{
    try {
        const {name, price, quantity} = req.body
        const user = await User.findById(req.params.id)
        let order = await Order.create({
            name,
            price,
            quantity,
            user:req.user._id
        })
        user.orders.push(order._id)
        await user.save()
        res.status(200).json({
            success:true,
            order
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.msg
        })
    }
}

//-----------------all order----------------
exports.allOrders = async(req,res,next)=>{
    try {
        const orders = await Order.find()
        res.status(400).json({
            success:true,
            orders
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.msg
        })
    }
}