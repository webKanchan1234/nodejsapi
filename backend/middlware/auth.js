const User = require("../models/userModel")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = async(req,res,next)=>{
    try {
        const {token} = req.cookies
        if(!token){
            return res.status(401).json({
                success:false,
                msg:"Please login first"
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decode._id)
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            msg:error.msg
        })
    }
}