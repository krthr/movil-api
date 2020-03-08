"use strict";

const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  dbId: {
    type: String,
    required: true,
    unique: true
  },

  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Course", CourseSchema);
