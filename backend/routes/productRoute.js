const express = require("express")
const { createProduct } = require("../controllers/productController")
const { isAuthenticated } = require("../middlware/auth")
const router = express.Router()




router.route("/seller/create-catalog").post(isAuthenticated, createProduct)



module.exports =router