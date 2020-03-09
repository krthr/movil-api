"use strict";

const { HttpException } = require("@adonisjs/generic-exceptions");

const message = "Resource not found.";
const status = 404;
const code = "E_NOT_FOUND";

class NotFoundException extends HttpException {
  constructor() {
    super(message, status, code);
  }

  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    response.status(404).json({
      error: {
        message,
        status,
        code
      }
    });
  }
}

module.exports = NotFoundException;
