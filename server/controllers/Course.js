const { uploadImage } = require("../utils/cloudanory");
const Catagory = require("../models/Catagory");
const User = require("../models/User");
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      catagory,
      language,
      tag
    } = req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !thumbnail ||
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !catagory ||
      !language ||
      !tag
    ) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    //check the instructor
    const instructor = await User.findById(req.user.id);
    if (!instructor) {
      return res.status(401).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    //check catagory
    const catagoryData = await Catagory.findById(catagory);
    if (!catagoryData) {
      return res.status(401).json({ success: false, message: "Invalid catagory" });
    }

    //upload thumbnail
    const thumbnailUrl = await uploadImage(
      thumbnail,
      process.env.UPLOAD_FOLDER
    );

    if (!thumbnailUrl) {
      return res
        .status(500)
        .json({ success: false, message: "Error in uploading thumbnail" });
    }

    //create a new course
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      price,
      language,
      tag,
      thumbnail: thumbnailUrl.secure_url,
      category: catagoryData._id,
      instructor: instructor._id,
      whatYouWillLearn,
    });

    //update user
    await User.findByIdAndUpdate(
      instructor._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    //update catagory
    await Catagory.findByIdAndUpdate(
      catagoryData._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    return res.status(201).json({
      success: true,
      message: "Course created successfully",
      newCourse,
    });
  } catch (error) {
    console.log("error in creating course");
    res
      .status(500)
      .json({ success: false, message: "Error in creating course" });
  }
};

exports.getAllCourses = async (req, res) => {
  try {
    const allcourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        tag: true,
        studentsEnrolled: true,
        instructor: true,
        ratingAndReviews: true,
      }
    )
      .populate("instructor")
      .exec();
    return res.status(200).json({
      success: true,
      message: "All courses fetched successfully",
      allcourses,
    });
  } catch (error) {
    console.log("error in getting all courses");
    res
      .status(500)
      .json({ success: false, message: "Error in getting all courses" });
  }
};
