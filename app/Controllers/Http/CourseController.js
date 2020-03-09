"use strict";

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

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
  async index({ params, request, response }) {
    const { dbId } = params;
    const { page = 1 } = request.get();

    const courses = await Course.query()
      .where("db_id", dbId)
      .with('students.person')
      .with('professor.person')
      .paginate(page);

    return courses;
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
    const { dbId } = params
    const course = await use("App/Models/Course").create({ db_id: dbId });
    return course
  }

  async restart({ params, request, response }) {
    const { dbId } = params
    const course = await use("App/Models/Course").create({ db_id: dbId });
    return course
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
      .first();

    if (!course) {
      throw new NotFoundException();
    }

    return course;
  }
}

module.exports = CourseController;
