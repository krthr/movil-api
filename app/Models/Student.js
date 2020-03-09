"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Student extends Model {
  course() {
    return this.belongsTo("App/Models/Course");
  }

  person() {
    return this.belongsTo("App/Models/Person");
  }
}

module.exports = Student;
