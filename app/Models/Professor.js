"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");
const Person = use("App/Models/Person");
class Professor extends Model {
  person() {
    return this.belongsTo("App/Models/Person");
  }

  course() {
    return this.belongsTo("App/Models/Course");
  }

  static boot() {
    super.boot();

    this.addHook("beforeCreate", async (professor) => {
      const person = await Person.create();
      professor.person_id = person.id;
    });
  }

  static get hidden() {
    return ["db_id", "person_id", "created_at", "updated_at"];
  }
}

module.exports = Professor;
