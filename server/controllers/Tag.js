const Tag = require("../models/Tag");

exports.addTag = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(403)
        .json({ success: false, message: "Name and description are required" });
    }
    const tagDetails = await Tag.create({ name, description });
    res.status(201).json({ success: true, tagDetails });
  } catch (error) {
    console.log("error in adding tag");
    res.status(500).json({ success: false, message: "Error in adding tag" });
  }
};

exports.showAllTags = async (req, res) => {
  try {
    const tags = await Tag.find({}, { name: true, description: true });
    return res.status(200).json({ success: true, tags });
  } catch (error) {
    console.log("error in showing all tags");
    res
      .status(500)
      .json({ success: false, message: "Error in showing all tags" });
  }
};
