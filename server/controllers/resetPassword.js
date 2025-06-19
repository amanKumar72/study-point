const { randomBytes } = require("node:crypto");
const paswordResetSuccessful=require("../mail/templates/passwordUpdate.js");
const User=require("../models/User");
const sendMail=require("../utils/nodemailer");
const passwordChangeLink=require("../mail/templates/PasswordChangeLink.js");
const bcrypt = require("bcrypt");
const { log } = require("node:console");


//reset passwordToken generation and set it to user
exports.resetpasswordToken = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(403).json({
        success: false,
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }
    //generate a token
    const token = randomBytes(256).toString("hex");
    //update user
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        token,
        resetPasswordExpires: Date.now() + 15*60*1000,
      },
      { new: true }
    );
    //send email
    sendMail(
      user.email,
      "Reset Password",
      passwordChangeLink(user.email, user.firstName, token)
    );
    return res.status(200).json({
      success: true,
      message: "link sent successfully on the email",
    });
  } catch (error) {
    console.log("error in resetting token password");
    return res
      .status(500)
      .json({ message: "Error in resetting token password",success:false ,error:error.message});
  }
};

//reset password with token
exports.resetPassword = async (req, res) => {
  try {
    const { password, confirmPassword, token } = req.body;

    if (!token || !password || !confirmPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if new password and confirm new password are the same
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm new password must be same,try again",
      });
    }

    //find user
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "token is invalid ",
      });
    }


    if (user.resetPasswordExpires < Date.now()) {
      return res.status(404).json({
        success: false,
        message: "token is expired ",
      });
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(password, 10);

    //update user
    const updatedUser = await User.findOneAndUpdate(
      { token },
      {
        password: hashedPassword,
        token: null,
        resetPasswordExpires: null,
      },
      { new: true }
    );

    //send email
    sendMail(
      user.email,
      "Reset Password Successful",
      paswordResetSuccessful(user.email, user.name)
    );

    return res.status(200).json({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log("error in resetting password");
    return res.status(500).json({ message: "Error in resetting password" });
  }
};
