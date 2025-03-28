const jwt = require("jsonwebtoken");

const generateToken=(payload)=>{
    try {
        return jwt.sign(payload,process.env.SECRET,{
            expiresIn: "2h"
        })
    } catch (error) {
        console.log("error in generating token");
        return "error "
    }
}

const verifyToken=(token)=>{
    try {
        return jwt.verify(token,process.env.SECRET)
    } catch (error) {
        console.log("error in verifying token");
        return "error "
    }
}


module.exports={generateToken,verifyToken}