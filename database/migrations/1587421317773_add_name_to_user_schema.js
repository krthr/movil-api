"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AddNameToUserSchema extends Schema {
  up() {
    this.table("users", (table) => {
      table.text("name");
    });
  }

  down() {
    this.table("users", (table) => {
      // reverse alternations
    });
  }
}

module.exports = AddNameToUserSchema;
