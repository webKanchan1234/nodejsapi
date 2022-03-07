const Product = require("../models/productModel")
const User = require("../models/userModel")

exports.createProduct = async(req,res,next)=>{
    try {
        const product = await Product.create(req.body)
        const user = await User.findById(req.user._id)
        user.products.push(product._id)
        await user.save()
        res.status(201).json({
            success:true,
            product
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:error.msg
        })
    }
}