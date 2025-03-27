const { contactUsEmail } = require("../mail/templates/contactFormRes");
const sendMail = require("../utils/nodemailer");
const axios = require("axios");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  if (!email || !firstname || !message || !phoneNo) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
  }
  const isValidFormat = emailRegex.test(email);

  if (!isValidFormat) {
    return res.status(400).json({
      success: false,
      message: "Invalid email format ",
    });
  }
  let isValidEmail = false;
  axios
    .get(
      `https://emailvalidation.abstractapi.com/v1/?api_key=${process.env.ABSTRACT_API_KEY}&email=${email}`
    )
    .then((response) => {
      isValidEmail = true;
    })
    .catch((error) => {
      return res.status(500).json({
        success: false,
        message: "Something went wrong...",
        error
      });
    });

  if (!isValidEmail) {
    return res.status(400).json({
      success: false,
      message: "Invalid email ",
    });
  }
  try {
    const emailRes = await sendMail(
      email,
      "Thanks from Study",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );
    return res.json({
      success: true,
      message: "Email send successfully",
    });
  } catch (error) {
    console.log("Error message :", error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
