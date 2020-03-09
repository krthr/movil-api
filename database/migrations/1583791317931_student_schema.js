"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class StudentSchema extends Schema {
  up() {
    this.create("students", table => {
      table.increments();
      table.string("db_id");
      table.integer("course_id").unsigned();
      table.integer("person_id").unsigned();
      table.timestamps();
    });
  }

  down() {
    this.drop("students");
  }
}

module.exports = StudentSchema;
