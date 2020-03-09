"use strict";

class Course {
  get rules() {
    return {
      name: "required|string"
    };
  }
}

module.exports = Course;
