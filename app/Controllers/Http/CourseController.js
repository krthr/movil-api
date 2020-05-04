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
  async index({ params, request }) {
    const { dbId } = params;

    const courses = await Course.query()
      .where("db_id", dbId)
      .with("students")
      .with("professor.person")
      .fetch();

    return courses.toJSON().map(({ id, name, professor, students }) => ({
      id,
      name,
      professor: professor.person.name,
      students: students.length,
    }));
  }

  /**
   * Create/save a new course.
   * POST courses
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ params, request }) {
    const { dbId } = params;

    const temp = await Course.create({ db_id: dbId });
    let course = await Course.query()
      .where("id", temp.id)
      .where("db_id", dbId)
      .with("professor.person")
      .with("students")
      .first();

    const {
      name,
      id,
      professor: {
        person: { name: professorName },
      },
      students,
    } = course.toJSON();

    return {
      id,
      name,
      professor: professorName,
      students: students.length,
    };
  }

  /**
   *
   * TODO: Eliminar profesores y estudiantes del curso
   */
  async restart({ params, request, response }) {
    const { dbId } = params;

    await Course.query().where({ db_id: dbId }).delete();
    await this.store({ params, request, response });

    return {
      result: true,
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
  async show({ params }) {
    const { dbId, id } = params;

    let course = await Course.query()
      .where("id", id)
      .where("db_id", dbId)
      .with("professor.person")
      .with("students.person")
      .first();

    if (!course) {
      throw new NotFoundException(id);
    }

    course = course.toJSON();

    const professorInfo = course.professor.person;
    const students = course.students.map(
      ({ id, person: { name, username, email } }) => ({
        id,
        name,
        username,
        email,
      })
    );

    return {
      name: course.name,
      professor: {
        id: course.professor.id,
        name: professorInfo.name,
        username: professorInfo.username,
        email: professorInfo.email,
      },
      students,
    };
  }
}

module.exports = CourseController;
