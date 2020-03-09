"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Faker = use("Faker");

class Course extends Model {
  professor() {
    this.hasOne("App/Models/Professor");
  }

  students() {
    this.hasMany("App/Models/Student");
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", course => {
      course.name = Faker.getRandomName();
    });
  }
}

module.exports = Course;
