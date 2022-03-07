const User = require("../models/userModel")


exports.registerUser = async(req,res,next)=>{
    try {
        const {name, email, password,role} = req.body
        let user = await User.findOne({email})
        if(user){
           return res.status(400).json({
                success:false,
                msg:"User already exists with this email"
            }) 
        }
        user = await User.create({
            name,
            email,
            password,
            role
        })
        const token = await user.generateToken()
        const options={
            expires:new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            httpOnly:true
        }
        res.status(200).cookie("token",token,options).json({
            success:true,
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.msg
        })
    }
}
//------------------login user----------------
exports.loginUser = async(req,res,next)=>{
    try {
        const {email, password} = req.body

        const user = await User.findOne({email}).select("+password")
        if(!user){
            return res.status(400).json({
                success:false,
                msg:"User not found"
            })
        }
        const isMatch = await user.isMatchPassword(password)
        if(!isMatch){
            return res.status(400).json({
                success:false,
                msg:"Invalid password"
            })
        }
        const token = await user.generateToken()
        const options={
            expires:new Date(Date.now() + 2*24*60*60*1000),
            httpOnly:true
        }
        res.status(200).cookie("token",token,options).json({
            success:false,
            user,
            token
        })
    } catch (error) {
        res.status(200).json({
            success:false,
            msg:error.msg
        })
    }
}
//--------------------logout------------------------
exports.logoutUser = async(req,res,next)=>{
    try {
        const options={
            expires:new Date(Date.now()),
            httpOnly:true
        }
        res.status(200).cookie("token",null,options).json({
            success:false,
            msg:"Logout"
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.msg
        })
    }
}
//-------------------list of sellers----------------------
exports.allSellers = async(req,res,next) =>{
    try {
        const {role} = req.body
        const sellers = await User.find({role})
        res.status(400).json({
            success:false,
            sellers
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.msg
        })
    }
}
//-------------------get seller catalog i.e seller details------------
exports.sellerDetails = async(req,res,next) =>{
    try {
        const seller = await User.findById(req.params.id).populate("products orders")
        res.status(400).json({
            success:false,
            seller
        })
    } catch (error) {
        res.status(400).json({
            success:false,
            msg:error.msg
        })
    }
}