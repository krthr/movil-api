"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Course extends Model {
  professor() {
    this.hasOne("App/Models/Professor");
  }
}

module.exports = Course;
