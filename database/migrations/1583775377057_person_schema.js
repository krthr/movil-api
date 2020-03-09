"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PersonSchema extends Schema {
  up() {
    this.create("people", table => {
      table.increments();

      table.string("name");
      table.string("username");
      table.date("birthday");
      table.string("email");

      table.string("address_street");
      table.string("address_city");
      table.string("address_state");
      table.string("address_country");
      table.float("address_get_lat");
      table.float("address_get_lng");
      table.string("address_zipcode");

      table.string("phone");

      table.timestamps();
    });
  }

  down() {
    this.drop("people");
  }
}

module.exports = PersonSchema;
