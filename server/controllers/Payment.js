const { default: mongoose } = require("mongoose");
const { instance } = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const sendMail = require("../utils/nodemailer");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");

exports.capturePayment = async (req, res) => {
  const { courseId } = req.body;
  const id = req.user.id;
  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course Id is required",
    });
  }
  try {
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course Id is not valid",
      });
    }

    //student is alrady enrolled
    const uid = mongoose.Types.ObjectId(id);
    if (course.studentsEnrolled.includes(uid)) {
      return res.status(400).json({
        success: false,
        message: "Student already enrolled",
      });
    }

    const options = {
      amount: course.price * 100,
      currency: "INR",
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId,
        userId: id,
      },
    };

    //create a order
    const orderRes = await instance.orders.create(options);

    //sending res

    res.status(200).json({
      success: true,
      message: "payment successful",
      courseName: course.courseName,
      courseDescription: course.courseDescription,
      thumbnail: course.thumbnail,
      amount: orderRes.amount,
      currency: orderRes.currency,
      orderId: orderRes.id,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Error is capturing payment",
    });
  }
};

exports.verifySignature = async (req, res) => {
  const signature = req.headers["x-razorpay-signature"];

  const hashedBody = crypto
    .createHmac("sha256", process.env.WEBHOOK_SECRET)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hashedBody === signature) {
    //performing action

    //extract coursea and user id from notes
    const { courseId, userId } = req.body.payload.payment.entity.notes;

    try {
      const user = await User.findByIdAndUpdate(
        userId,
        {
          $push: {
            courses: courseId,
          },
        },
        { new: true }
      );
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "User not found in verify signature",
        });
      }
      const course = await Course.findByIdAndUpdate(
        courseId,
        {
          $push: {
            studentsEnrolled: userId,
          },
        },
        { new: true }
      );
      if (!course) {
        return res.status(400).json({
          success: false,
          message: "course not found in verify signature",
        });
      }

      await sendMail(
        user.email,
        "Course Enrollment",
        courseEnrollmentEmail(course.courseName, user.firstName)
      );

      return res.status(200).json({
        success: true,
        message: "payment successfull",
      });
    } catch (error) {
      return res.status(500).json({
        success: true,
        error: error.message,
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: "Invalid signature",
    });
  }
};
