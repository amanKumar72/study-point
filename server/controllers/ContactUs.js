const { contactUsEmail } = require("../mail/templates/contactFormRes");
const sendMail = require("../utils/nodemailer");

exports.contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  if (!email || !firstname || !lastname || !message || !phoneNo) {
    return res.json({
      success: false,
      message: "All fields are required",
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
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
