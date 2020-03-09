'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProfessorSchema extends Schema {
  up() {
    this.create('professors', (table) => {
      table.increments()
      table.string("db_id")
      table.integer("person_id").unsigned()
      table.integer("course_id").unsigned()
      table.timestamps()
    })
  }

  down() {
    this.drop('professors')
  }
}

module.exports = ProfessorSchema
