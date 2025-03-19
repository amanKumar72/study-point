const Section = require("../models/Section");
const Course = require("../models/Course");

exports.addSection = async (req, res) => {
  const { name, description, courseId } = req.body;
  if (!name || !description || !courseId) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const newSection = await Section.create({
      sectionName: name,
      sectionDescription: description,
    });

    const updatedCourse = await Course.findOneAndUpdate(
      { _id: courseId },
      { $pull: { courseContent: newSection._id } },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "new section created successfully",
      updatedCourse,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to create new section",
      error: error.message,
    });
  }
};

exports.updateSection = async (req, res) => {
  const { name, description, sectionId } = req.body;
  if (!name || !description || !sectionId) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }
  try {
    const section = await Section.find({ id: sectionId });
    if (!section) {
      return res.status(400).json({
        message: "No section available with the given id",
        success: false,
      });
    }
    const updatedSection = await Section.findOneAndUpdate(
      { _id: sectionId },
      { $set: { sectionName: name, sectionDescription: description } },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Section updated successfully",
    });
    const newSection = await Section.create({
      name,
      description,
    });

    res.status(200).json({
      success: true,
      message: " section updated successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update section",
      error: error.message,
    });
  }
};

exports.deleteSection = async (req, res) => {
  const { sectionId } = req.params;
  if (!sectionId) {
    return res.status(400).json({
      success: false,
      message: "section id is mandatory",
    });
  }
  try {
    const section = await Section.findByIdAndDelete(sectionId);
    if (!section) {
      return res.status(400).json({
        message: "No section available with the given id",
        success: false,
      });
    }
    //TODO:do we need to delete the section from the course
    res.status(200).json({
      success: true,
      message: "Section is deleted",
      section,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section",
      error: error.message,
    });
  }
};
