const mongoose = require("mongoose");

// Define the Section schema
const sectionSchema = new mongoose.Schema({
  sectionName: {
    type: String,
    required: true,
  },
  sectionDescription: {
    type: String,
  },
  sectionDuration: {
    type: String,
  },
  subSections: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "SubSection",
    },
  ],
});

// Export the Section model
module.exports = mongoose.model("Section", sectionSchema);
