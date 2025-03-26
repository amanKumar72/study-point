const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
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
      { $push: { courseContent: newSection._id } },
      { new: true }
    )
      .populate({
        path: "courseContent",
        populate: {
          path: "subSections",
        },
      })
      .exec();

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
  if (!sectionId || !name && !description) {
    return res.status(400).json({
      message: "Section id is required and at least one of name or description is required",
    });
  }
  try {
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(400).json({
        message: "No section available with the given id",
        success: false,
      });
    }

    if (name && name !== section.sectionName) {
      section.sectionName = name;
    }
    if (description && description !== section.sectionDescription) {
      section.sectionDescription = description;
    }
    const updatedSection = await section.save();
    
    res.status(200).json({
      success: true,
      message: " section updated successfully",
      updatedSection,
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
  const { sectionId } = req.body;
  if (!sectionId) {
    return res.status(400).json({
      success: false,
      message: "section id is mandatory",
    });
  }
  try {
    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(400).json({
        message: "No section available with the given id",
        success: false,
      });
    }

    //TODO:do we need to delete the section from the course -Done

    await SubSection.deleteMany({ _id: { $in: section.subSections } });

    await Section.findByIdAndDelete(sectionId);

    // await Course.findByIdAndUpdate(sectionId, {
    //   $pull: { courseContent: sectionId },
    // });

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
