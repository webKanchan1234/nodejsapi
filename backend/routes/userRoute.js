const express = require("express")
const { registerUser, loginUser, logoutUser, allSellers, sellerDetails } = require("../controllers/userController")
const router = express.Router()




router.route("/auth/register").post(registerUser)
router.route("/auth/login").post(loginUser)
router.route("/auth/logout").get(logoutUser)
router.route("/auth/buyer/list-of-sellers").post(allSellers)
router.route("/auth/buyer/seller-catalog/:id").get(sellerDetails)


module.exports =router