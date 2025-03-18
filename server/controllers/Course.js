const { uploadImage } = require("../utils/cloudanory");
const Tag = require("../models/Tag");
const User = require("../models/User");
const Course = require("../models/Course");

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      language,
    } = req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !thumbnail ||
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !tag ||
      !language
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

    //check tag
    const tagData = await Tag.findById(tag);
    if (!tagData) {
      return res.status(401).json({ success: false, message: "Invalid tag" });
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
      thumbnail: thumbnailUrl.secure_url,
      tag: tagData._id,
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

    //update tag
    await Tag.findByIdAndUpdate(
      tagData._id,
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
