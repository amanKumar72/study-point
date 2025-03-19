const { isValidObjectId } = require("mongoose");
const Profile = require("../models/Profile");
const User = require("../models/User");

exports.updateProfile = async (req, res) => {
  try {
    const { gender, dateOfBirth, about, address, contactNumber } = req.body;
    const id = req.user.id;
    if (
      !gender ||
      !dateOfBirth ||
      !about ||
      !address ||
      !contactNumber ||
      !id
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    const profile = await Profile.findByIdAndUpdate(
      user.additionalDetails,
      {
        gender,
        dateOfBirth,
        about,
        address,
        contactNumber,
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to update profile",
      error: error.message,
    });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }
    const user = await User.findById(id);
    const profileId = user.additionalDetails;
    await Profile.findByIdAndDelete(user.additionalDetails);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    await User.findByIdAndDelete(id);

    //TODO: remove user from all places in which he is involved
    return res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to delete account",
      error: error.message,
    });
  }
};

exports.getUserDetails = async (req, res) => {
  try {
    const id = req.user.id;
    if (!id || !isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "id not found",
      });
    }
    const user = await User.findById(id).populate("additionalDetails").exec();

    res.status(200).json({
      success: true,
      user,
      message: "user dettails fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Unable to get user details",
      error: error.message,
    });
  }
};
