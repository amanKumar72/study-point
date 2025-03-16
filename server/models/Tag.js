const mongoose = require("mongoose");

const { Schema } = mongoose;
const tagSchema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String

  },
  course:{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }
});
const Tag = mongoose.model("Tag", tagSchema);
