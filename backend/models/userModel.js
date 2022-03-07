const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter name"]
    },
    email:{
        type:String,
        required:[true,"Please enter email"],
        unique:[true,"Email already exist"]
    },
    password:{
        type:String,
        required:[true,"Please enter password"],
        minlength:[6,"Minimum 6 character password"],
        select:false
    },
    role:{
        type:String,
        required:[true,"Please Enter role"]
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Product"
        }
    ],
    orders:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Order"
        }
    ],
   
    resetPasswordToken:String,
    resetPasswordExpire:Date
})

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.isMatchPassword = async function(password){
    return bcrypt.compare(password,this.password)
}
userSchema.methods.generateToken = async function(){
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

module.exports = mongoose.model("User",userSchema)