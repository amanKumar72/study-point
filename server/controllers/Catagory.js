const Catagory = require("../models/Catagory");

exports.addCatagoey = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res
        .status(403)
        .json({ success: false, message: "Name and description are required" });
    }
    const catagoryDetails = await Catagory.create({ name, description });
    res.status(201).json({ success: true, catagoryDetails });
  } catch (error) {
    console.log("error in adding catagory");
    res.status(500).json({ success: false, message: "Error in adding catagory" });
  }
};

exports.showAllCatagory = async (req, res) => {
  try {
    const catagory = await Catagory.find({}, { name: true, description: true });
    return res.status(200).json({ success: true, catagory });
  } catch (error) {
    console.log("error in showing all catagory");
    res
      .status(500)
      .json({ success: false, message: "Error in showing all catagory" });
  }
};
