"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const NotFoundException = use("App/Exceptions/NotFoundException");
const Professor = use("App/Models/Professor");

/**
 * Resourceful controller for interacting with professors
 */
class ProfessorController {
  /**
   * Show a list of all professors.
   * GET professors
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params, request, response }) {
    const { dbId } = params;
    const { page } = request.get();

    const professors = await Professor.query()
      .where("db_id", dbId)
      .with("course")
      .with("person")
      .paginate(page);

    return professors;
  }

  /**
   * Display a single professor.
   * GET professors/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, request, response }) {
    const { dbId, id } = params;

    const professor = await Professor.query()
      .where("id", id)
      .where("db_id", dbId)
      .with("course.students")
      .with("person")
      .first();

    if (!professor) {
      throw new NotFoundException();
    }

    return professor;
  }
}

module.exports = ProfessorController;
