const express = require("express")
const app = express()
const dotenv = require("dotenv")
const bodyParser = require("body-parser")
const {databaseConnection} = require("./config/database")
const cookieParser = require("cookie-parser")

app.use(express.json())
dotenv.config({path:"./backend/config/config.env"})
databaseConnection()
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const user = require("./routes/userRoute")
const product = require("./routes/productRoute")
const order = require("./routes/orderRoute")
app.use("/api",product)
app.use("/api",user)
app.use("/api",order)





module.exports = app