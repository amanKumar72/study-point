const RatingAndReview = require("../models/RatingAndReview");
const User = require("../models/User");
const Course = require("../models/Course");
const { default: mongoose, ObjectId } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const { rating, review, courseId } = req.body;
    const userId = req.user.id;

    if (!rating || !review || !courseId || !userId) {
      return res.status(400).json({
        success: false,
        message: "rating,review,userId and courseId are required",
      });
    }

    console.log(userId);

    //find the course and user is enrolled in the course
    const course = await Course.findOne({
      _id: new mongoose.Types.ObjectId(courseId),
    });

    if (!course || !course?.studentsEnrolled.includes(userId)) {
      return res.status(404).json({
        success: false,
        message: "Course not found with the user",
      });
    }
    const user = await User.findById(userId);

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "Course already reviewed by user",
      });
    }

    const ratingAndReview = await RatingAndReview.create({
      rating,
      review,
      course: course._id,
      user: userId,
    });

    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: { ratingAndReviews: ratingAndReview._id },
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingAndReview,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    //get avg rating
    const avgRating = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          avgRating: {
            $avg: "$rating",
          },
        },
      },
    ]);

    if (avgRating.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No ratings found for the course",
        averageRating: 0,
      });
    }
    // const course = await Course.findById(courseId);
    // const ratings = course.ratingAndReviews;
    // const avgRating = ratings.reduce((acc, rating) => acc + rating.rating, 0) / ratings.length;
    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      averageRating: avgRating[0].avgRating,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRatingReview = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    if (courseId) {
      const ratings = await RatingAndReview.find({
        course: new mongoose.Types.ObjectId(courseId),
      })
        .populate({ path: "User", select: "firstName lastName email image" })
        .populate({ path: "Course", select: "courseName" })
        .exec();
      return res.status(200).json({
        success: true,
        message: "Ratings of course fetched successfully",
        ratings,
      });
    } else {
      const ratings = await RatingAndReview.find({})
        .populate({ path: "user", select: "firstName lastName email image" })
        .populate({ path: "course", select: "courseName" })
        .exec();
      return res.status(200).json({
        success: true,
        message: "Ratings fetched successfully",
        ratings,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
