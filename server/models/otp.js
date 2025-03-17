const { Schema, model } = require("mongoose");
const sendMail = require("../utils/nodemailer");

const otpSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 10, // The document will be automatically deleted after 10 minutes of its creation time
  },
});

const sendVerificationMail = (mail, otp) => {
  try {
    const info = sendMail(
      mail,
      "Verify your email for study-point",
      `Your verification code is ${otp}`
    );
    console.log("Email sent successfully", info);
  } catch (error) {
    console.error("Error while sending verification email:", error.message);
    console.error(error);
  }
};

otpSchema.pre("save", async function (next) {
  await sendVerificationMail(this.email, this.otp);
  next();
});
module.exports = model("Otp", otpSchema);
