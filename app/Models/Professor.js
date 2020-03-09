"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Professor extends Model {
  course() {
    this.belongsTo("App/Models/Course");
  }
}

module.exports = Professor;
