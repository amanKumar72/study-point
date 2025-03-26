const { uploadImage } = require("../utils/cloudanory");
const Category = require("../models/Category");
const User = require("../models/User");
const Course = require("../models/Course");
const {convertSecondsToDuration}=require("../utils/convertSecToDuration");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { default: mongoose } = require("mongoose");
const CourseProgress = require("../models/CourseProgress");

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category,
      language,
      instructions,
      status,
      tag,
    } = req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !thumbnail ||
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !language ||
      !tag ||
      !instructions.length
    ) {
      return res
        .status(403)
        .json({ success: false, message: "All fields are required" });
    }

    if (!status || status === undefined) {
      status = "Draft"
    }
    //check the instructor
    const instructor = await User.findById(req.user.id);
    if (!instructor) {
      return res.status(401).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    //check Category
    const CategoryData = await Category.findById(new mongoose.Types.ObjectId(category.trim()));
    if (!CategoryData) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid Category" });
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
      category: CategoryData._id,
      instructor: instructor._id,
      whatYouWillLearn,
      instructions,
      status: status.trim()
    });

    //update user
    await User.findByIdAndUpdate(
      instructor._id,
      {
        $push: { courses: newCourse._id },
      },
      { new: true }
    );

    //update Category
    await Category.findByIdAndUpdate(
      CategoryData._id,
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
      .json({ success: false, message: "Error in creating course", error: error.message });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }
console.log(updates);

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        if (key === "tag" || key === "instructions") {
          course[key]=[]
          for(const item of updates[key]){
            course[key].push(item);
          }
        } else {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
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

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "courseId is required",
      });
    }
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
          select: "-videoUrl",
        },
      })
      .populate({
        path: "studentsEnrolled",
        populate: { path: "additionalDetails" },
      })
      .exec();

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      });
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      });
    }

    console.log(courseDetails);

    let totalDurationInSeconds = 0;
    courseDetails?.courseContent?.forEach((content) => {
      content?.subSections?.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec()

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    if (courseDetails.status === "Draft") {
      return res.status(403).json({
        success: false,
        message: `Accessing a draft course is forbidden`,
      })
    }

    let totalDurationInSeconds = 0
    courseDetails?.courseContent?.forEach((content) => {
      content?.subSections?.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}

// Get a list of Course for a given Instructor
exports.getInstructorCourses = async (req, res) => {
  try {
    // Get the instructor ID from the authenticated user or request body
    const instructorId = req.user.id

    // Find all courses belonging to the instructor
    const instructorCourses = await Course.find({
      instructor: instructorId,
    }).sort({ createdAt: -1 })

    // Return the instructor's courses
    res.status(200).json({
      success: true,
      data: instructorCourses,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}
// Delete the Course
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const id=req.user.id
    // Find the course
    const course = await Course.findById(courseId)
    const user=await User.findById(id)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSections
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    await User.findByIdAndUpdate(id, {
      $pull: { courses: courseId },
    })

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}
