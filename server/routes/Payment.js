const Payment=require("../controllers/Payment")
const {auth,isStudent} =require("../middlewares/auth")

const router=require("express").Router()

router.post("/capturePayment",auth,isStudent,Payment.capturePayment)
router.post("/verifySignature",Payment.verifySignature)

module.exports=router
