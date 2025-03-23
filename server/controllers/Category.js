const Category = require("../models/Category");
const Course = require("../models/Course");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(403)
        .json({ success: false, message: "Name and description are required" });
    }
    const CategoryDetails = await Category.create({ name, description });
    res.status(201).json({ success: true, CategoryDetails });
  } catch (error) {
    console.log("error in adding Category");
    res
      .status(500)
      .json({ success: false, message: "Error in adding Category" });
  }
};

exports.showAllCategories = async (req, res) => {
  try {
    const Category = await Category.find({}, { name: true, description: true });
    return res.status(200).json({ success: true, Category });
  } catch (error) {
    console.log("error in showing all Category");
    res
      .status(500)
      .json({ success: false, message: "Error in showing all Category" });
  }
};

//get the data of a particular category with some predefined category sunh as top selling etc
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    const courses = await Category.findById(categoryId)
      .populate("courses")
      .exec();
    if (!courses) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }

    //top selling courses
    const topEnrolledCourses = await Course.find({})
      .sort({ studentsEnrolled: -1 }) // Sort by array length in descending order
      .limit(10)
      .populate("instructor")
      .exec();

    return res.status(200).json({ success: true, courses });
  } catch (error) {
    console.log("error in getting category page details");
    res.status(500).json({
      success: false,
      message: "Error in getting category page details",
    });
  }
};
