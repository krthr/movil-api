"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Person = use("App/Models/Person");
class Student extends Model {
  course() {
    return this.belongsTo("App/Models/Course");
  }

  person() {
    return this.belongsTo("App/Models/Person");
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", async (student) => {
      const person = await Person.create();
      student.person_id = person.id;
    });
  }

  static get hidden() {
    return ["db_id", "person_id", "created_at", "updated_at"];
  }
}

module.exports = Student;
