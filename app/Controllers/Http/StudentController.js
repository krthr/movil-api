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
  async index({ params }) {
    const { dbId } = params;

    const students = await Student.query()
      .where("db_id", dbId)
      .with("person")
      .fetch();

    return students
      .toJSON()
      .map(({ id, person: { name, email, username } }) => ({
        id,
        name,
        email,
        username,
      }));
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
    try {
      const { dbId } = params;
      const { courseId } = request.post();

      const temp = await Student.create({
        db_id: dbId,
        course_id: courseId,
      });

      const student = await Student.query()
        .where("id", temp.id)
        .where("db_id", dbId)
        .with("person")
        .first();

      const {
        id,
        person: { name, email, username },
      } = student.toJSON();

      return {
        id,
        name,
        email,
        username,
      };
    } catch (e) {
      console.log(e);
      response.status(400).json({ error: "ID de curso inválido." });
    }
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

    let student = await Student.query()
      .where("id", id)
      .where("db_id", dbId)
      .with("person")
      .first();

    if (!student) {
      throw new NotFoundException(id);
    }

    student = student.toJSON();
    const {
      course_id,
      person: {
        name,
        username,
        phone,
        email,
        birthday,
        address_country,
        address_city,
      },
    } = student;

    return {
      course_id,
      name,
      username,
      phone,
      email,
      city: address_city,
      country: address_country,
      birthday: new Date(birthday),
    };
  }
}

module.exports = StudentController;
