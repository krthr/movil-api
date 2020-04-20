"use strict";

const { validate } = use("Validator");

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const NotFoundException = use("App/Exceptions/NotFoundException");
const Student = use("App/Models/Student");

/**
 * Resourceful controller for interacting with students
 */
class StudentController {
  /**
   * Show a list of all students.
   * GET students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async index({ params, request, response }) {
    const { dbId } = params;
    const { page } = request.get();

    const students = await Student.query()
      .where("db_id", dbId)
      .with("person")
      .paginate(page);

    return students;
  }

  /**
   * Create/save a new student.
   * POST students
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request, response }) {
    const { dbId } = params;
    const { courseId } = request.post();

    const validation = await validate(request.all(), {
      dbId: "required",
    });

    if (validation.fails()) {
      return response.send(validation.messages());
    }

    const student = await Student.create({
      db_id: dbId,
      course_id: courseId,
    });

    return student;
  }

  /**
   * Display a single student.
   * GET students/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {
    const { dbId, id } = params;

    const student = await Student.query()
      .where("id", id)
      .where("db_id", dbId)
      .with("person")
      .first();

    if (!student) {
      throw new NotFoundException();
    }

    return student;
  }
}

module.exports = StudentController;
