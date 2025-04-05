const router=require("express").Router();
const {contactUsController}=require('../controllers/ContactUs')

router.post("/",contactUsController)
module.exports=router;