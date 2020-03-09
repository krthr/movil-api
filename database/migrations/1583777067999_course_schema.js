"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CourseSchema extends Schema {
  up() {
    this.create("courses", table => {
      table.increments();

      table.string("db_id");
      table.string("name");

      table.timestamps();
    });
  }

  down() {
    this.drop("courses");
  }
}

module.exports = CourseSchema;
