const Category = require("../models/Category");

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
    res.status(500).json({ success: false, message: "Error in adding Category" });
  }
};

exports.showAllCategory = async (req, res) => {
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
