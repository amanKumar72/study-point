const mongoose = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const CourseProgress = require("../models/CourseProgress");
const Course = require("../models/Course");

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subsectionId } = req.body;
  const userId = req.user.id;

  try {
    // Check if the subsection is valid
    // console.log(subsectionId);
    
    const subsection = await SubSection.findById(subsectionId);
    // console.log(subsection);
    if (!subsection) {
      return res.status(404).json({success:false, error: "Invalid subsection" });
    }

    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    });

    if (!courseProgress) {
      // If course progress doesn't exist, create a new one
      courseProgress = await CourseProgress.create({
        userId,
        courseID: courseId,
      });
      courseProgress.completedVideos.push(subsectionId);
    } else {
      // If course progress exists, check if the subsection is already completed
      if (courseProgress.completedVideos.includes(subsectionId)) {
        return res.status(400).json({success:false, error: "Subsection already completed" });
      }

      // Push the subsection into the completedVideos array
      courseProgress.completedVideos.push(subsectionId);
    }

    // Save the updated course progress
    await courseProgress.save();

    return res.status(200).json({
      success: true,
      message: "Course progress updated",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProgressPercentage = async (req, res) => {
  const { courseId } = req.body;
  const userId = req.user.id;

  if (!courseId) {
    return res.status(400).json({
      success: false,
      message: "Course ID not provided.",
    });
  }

  try {
    // Find the course progress document for the user and course
    let courseProgress = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })
      .populate({
        path: "courseID",
        populate: {
          path: "courseContent",
        },
      })
      .exec();

    if (!courseProgress) {
      return res
        .status(400)
        .json({ error: "Can not find Course Progress with this ID." });
    }

    let lectures = 0;
    courseProgress.courseID.courseContent?.forEach((sec) => {
      lectures += sec.subSections.length || 0;
    });

    let progressPercentage =
      (courseProgress.completedVideos.length / lectures) * 100;

    // To make it up to 2 decimal point
    const multiplier = Math.pow(10, 2);
    progressPercentage =
      Math.round(progressPercentage * multiplier) / multiplier;

    return res.status(200).json({
      progressPercentage,
      message: "Succesfully fetched Course progress",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
