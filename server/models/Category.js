const mongoose = require("mongoose");

const { Schema } = mongoose;
const CategorySchema = new Schema({
  name:{
    type:String,
    required:true
  },
  description:{
    type:String
  },
  courses:[{
    type: Schema.Types.ObjectId,
    ref: 'Course'
  }]
});
const Category = mongoose.model("Category", CategorySchema);
module.exports = Category