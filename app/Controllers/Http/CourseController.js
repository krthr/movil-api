"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const NotFoundException = use("App/Exceptions/NotFoundException");
const Course = use("App/Models/Course");

/**
 * Resourceful controller for interacting with courses
 */
class CourseController {
  /**
   * Show a list of all courses.
   * GET courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ params, request, response, auth }) {
    try {
      await auth.check()
      
      const { dbId } = params;
      const { page = 1 } = request.get();

      const courses = await Course.query()
        .where("db_id", dbId)
        .with("students.person")
        .with("professor.person")
        .paginate(page);

      return courses;

    } catch (error) {
      response.send('Missing or invalid jwt token')
    }

  }

  /**
   * Create/save a new course.
   * POST courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    const { dbId } = params;
    const course = await Course.create({ db_id: dbId });
    return course;
  }

  /**
   *
   * TODO: Eliminar profesores y estudiantes del curso
   */
  async restart({ params, request, response }) {
    const { dbId } = params;

    await Course.query()
      .where({ db_id: dbId })
      .delete();

    await this.store({ params, request, response });

    return {
      result: true
    };
  }

  /**
   * Display a single course.
   * GET courses/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const { dbId, id } = params;

    const course = await Course.query()
      .where("id", id)
      .where("db_id", dbId)
      .with("professor.person")
      .with("students.person")
      .first();

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }
}

module.exports = CourseController;
