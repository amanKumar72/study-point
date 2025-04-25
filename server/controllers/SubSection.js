const { isValidObjectId } = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImage, deleteImageByUrl } = require("../utils/cloudanory");

exports.createSubSection = async (req, res) => {
  try {
    const { name, description, sectionId } = req.body;
    const videoFile = req?.files?.videoFile;
    if (!name || !description || !sectionId || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const alreadyAvailableSection = await Section.findOne({
      _id: sectionId,
    }).populate("subSections");

    // const alreadyAvailableSubSection=await SubSection.findOne({name})
    const alreadyAvailable = alreadyAvailableSection?.subSections.find(
      (sub) => sub.title === name
    );
    if (alreadyAvailable) {
      return res.status(400).json({
        success: false,
        message: "SubSection already available with this title",
      });
    }

    if (!isValidObjectId(sectionId) || !(await Section.findById(sectionId))) {
      return res.status(400).json({
        success: false,
        message: "No section available with this id",
      });
    }

    const url = await uploadImage(videoFile, process.env.UPLOAD_FOLDER);

    const subSection = new SubSection({
      title: name,
      description: description,
      videoUrl: url.secure_url,
    });

    await subSection.save();

    const updatedSection = await Section.findByIdAndUpdate(
      sectionId,
      {
        $push: { subSections: subSection._id },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "SubSection added successfully",
      sectionId,
      updatedSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to add subSection",
      error: error.message,
    });
  }
};

exports.updateSubSection = async (req, res) => {
  try {
    const { name, description, subSectionId } = req.body;
    const videoFile = req?.files?.videoFile;
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if (!isValidObjectId(subSectionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid subSection id",
      });
    }

    const subSection = await SubSection.findById(subSectionId);
    if (!subSection) {
      return res.status(400).json({
        success: false,
        message: "No sub Section available with this id",
      });
    }

    // TODO:remove previous image of video
    if (videoFile) {
      await deleteImageByUrl(subSection.videoUrl);
      const url = await uploadImage(videoFile, process.env.UPLOAD_FOLDER);

      if (!url) {
        return res.status(400).json({
          success: false,
          message: "Unable to upload image",
        });
      }

      subSection.videoUrl = url;
    }

    if (name && name != subSection.title) {
      subSection.title = name;
    }

    if (description && description != subSection.description) {
      subSection.description = description;
    }

    await subSection.save();

    res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubSection: subSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update subSection",
      error: error.message,
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { subSectionId } = req.body;
    if (!subSectionId) {
      return res.status(400).json({
        success: false,
        message: "subSection id required",
      });
    }
    if (
      !isValidObjectId(subSectionId) ||
      !(await SubSection.findById(subSectionId))
    ) {
      return res.status(400).json({
        success: false,
        message: "No sub Section available with this id",
      });
    }
    const subSection = await SubSection.findByIdAndDelete(subSectionId);

    res.status(200).json({
      success: true,
      message: "SubSection deleted successfully",
      subSection,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete section",
      error: error.message,
    });
  }
};
