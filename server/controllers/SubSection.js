const { default: mongoose, isValidObjectId } = require("mongoose");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const { uploadImage } = require("../utils/cloudanory");

exports.createSubSection = async (req, res) => {
  try {
    const { name, description, sectionId } = req.body;
    const videoFile = req.files.videoFile;
    if (!name || !description || !sectionId || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const section = await Section.findById(sectionId);
    if (!section) {
      return res.status(400).json({
        success: false,
        message: "No section available with the given id",
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
        $push: { sunSections: subSection._id },
      },
      { new: true }
    );

    res.status(201).json({
      success: true,
      message: "SubSection added successfully",
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

exports.updateSection = async (req, res) => {
  try {
    const { name, description, subSectionId } = req.body;
    const videoFile = req.files.videoFile;
    if (!name || !description || !subSectionId || !videoFile) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if(!isValidObjectId(subSectionId) || !(await SubSection.findById(subSectionId))){
        return res.status(400).json({
            success: false,
            message: "No sub Section available with this id",
          });
    }

    // TODO:remove previous image of video

    const url = await uploadImage(videoFile, process.env.UPLOAD_FOLDER);

    if (!url) {
      return res.status(400).json({
        success: false,
        message: "Unable to upload image",
      });
    }

    const updatedSubSection =await SubSection.findByIdAndUpdate(
      subSectionId,
      {
        title: name,
        description: description,
        videoUrl: url.secure_url,
      },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "SubSection updated successfully",
      updatedSubSection,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update subSection",
      error: error.message,
    });
  }
};

exports.deleteSection=async (req,res)=>{
    try {
        const {subSectionId} =req.params;
        if(!subSectionId){
            return res.status(400).json({
                success: false,
                message: "sun sectiopn id required",
              }); 
        }
        if(!isValidObjectId(subSectionId) || !(await SubSection.findById(subSectionId))){
            return res.status(400).json({
                success: false,
                message: "No sub Section available with this id",
              });
        }
        const subSection=await SubSection.findByIdAndDelete(subSectionId)

        const updatedSection = await Section.findById(sectionId).populate(
          "subSection"
        )

        res.status(200).json({
            success: true,
            message: "SubSection deleted successfully",
            updatedSection
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Unable to delete section",
            error: error.message,
            });
    }
}