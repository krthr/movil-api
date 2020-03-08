"use strict";

const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
  dbId: {
    type: String,
    required: true,
    unique: true
  },

  course: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Course",
    required: true
  },

  person: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: "Person",
    required: true
  }
});

module.exports = mongoose.model("Student", StudentSchema);
