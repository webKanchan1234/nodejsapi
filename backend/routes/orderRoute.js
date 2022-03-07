const express = require("express")
const { orderItems, allOrders } = require("../controllers/orderController")
const { isAuthenticated } = require("../middlware/auth")
const router = express.Router()




router.route("/buyer/create-order/:id").post(isAuthenticated, orderItems)
router.route("/seller/orders").get(isAuthenticated,allOrders)


module.exports =router