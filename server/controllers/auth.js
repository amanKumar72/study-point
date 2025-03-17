const otpGenerator = require("otp-generator");
const User = require("../models/User");
const Otp = require("../models/Otp");
const Profile = require("../models/Profile");
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/JWT");
const sendMail = require("../utils/nodemailer");
//login

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!password || !email) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const payload = {
      user: user._id,
      email: user.email,
      accountType: user.accountType,
    };

    const token = generateToken(payload);

    user.token = token;
    user.password = undefined;

    return res
      .cookie("token", token, {
        httpOnly: true,
        expires: 3 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        success: true,
        message: "Login successful",
        user,
        token,
      });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to login",
    });
  }
};

//signup
exports.signup = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    confitmPassword,
    accountType,
    contactNumber,
    otp,
  } = req.body;
  try {
    //validate all fields
    if (
      !email ||
      !password ||
      !confitmPassword ||
      !firstName ||
      !lastName ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check confirm pass and pass are same
    if (password !== confitmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and confirm password must be same,try again",
      });
    }

    // check user already exists or not
    const isAvailable = await User.findOne({ email });
    if (isAvailable) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //check current otp

    const currentOtp = await Otp.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);
    if (currentOtp.length == 0) {
      return res.status(400).json({
        success: false,
        message: "otp doesn't exists",
      });
    } else if (currentOtp !== otp) {
      return res.status(400).json({
        success: false,
        message: "otp doesn't match",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    //save in db
    const profile = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      address: null,
      contactNumber,
    });

    //create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType,
      additionalDetails: profile,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to register user",
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword, confirmNewPassword } = req.body;

    //check if all fields are present
    if (!currentPassword || !newPassword || !confirmNewPassword) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }

    //check if new password and confirm new password are the same
    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({
        success: false,
        message: "New password and confirm new password must be same,try again",
      });
    }
    //check if current user is present
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    //check if current password is correct
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid current password",
      });
    }

    //hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    sendMail(user.email, "Password Changed", "Your password has been changed successfully");

    return res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log("error in changing password");
    return res.status(500).json({
      success: false,
      message: "error in changing password",
    });
  }
};

//send otp
generateOtp = async () => {
  let otp = otpGenerator(6, {
    upperCase: false,
    lowerCase: false,
    specialChars: false,
  });
  let isAvailable = await Otp.findOne({ otp });
  while (isAvailable) {
    otp = otpGenerator(6, {
      upperCase: false,
      lowerCase: false,
      specialChars: false,
    });
    isAvailable = await Otp.findOne({ otp });
  }
  return otp;
};

exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate a unique otp
    const otp = await generateOtp();

    //save otp in database
    const otpDoc = new Otp({
      otp,
      email,
    });

    await otpDoc.save();

    return res.status(200).json({
      success: true,
      message: "Otp sent successfully",
      otp,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to send otp",
    });
  }
};
