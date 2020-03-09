"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Faker = use("Faker");
const Student = use("App/Models/Student");
const Professor = use("App/Models/Professor");

class Course extends Model {
  professor() {
    return this.hasOne("App/Models/Professor");
  }

  students() {
    return this.hasMany("App/Models/Student");
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", course => {
      course.name = Faker.getRandomCourseName().toUpperCase();
    });

    this.addHook("afterCreate", async course => {
      const generalData = { course_id: course.id, db_id: course.db_id };
      await Promise.all([
        Student.create(generalData),
        Student.create(generalData),
        Student.create(generalData),
        Professor.create(generalData)
      ]);
    });
  }
}

module.exports = Course;
