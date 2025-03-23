const {login,sendOtp,signup,changePassword}=require("../controllers/auth")
const {resetPassword,resetpasswordToken}=require("../controllers/resetPassword")
const {auth}=require("../middlewares/auth")

const router=require("express").Router()

router.post("/login",login)
router.post("/send-otp",sendOtp)
router.post("/signup",signup)
router.post("/change-password",auth,changePassword)
router.post("/reset-password",resetPassword)
router.post("/reset-password-token",resetpasswordToken)

module.exports=router
