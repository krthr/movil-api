"use strict";

const { HttpException } = require("@adonisjs/generic-exceptions");

const message = "Resource not found.";
const status = 404;
const code = "E_NOT_FOUND";

class NotFoundException extends HttpException {
  constructor(resourceId) {
    super(message, status, code);
    this.resourceId = resourceId;
  }

  /**
   * Handle this exception by itself
   */
  handle(error, { response }) {
    response.status(404).json({
      error: "El recurso solicitado no existe. ID=" + this.resourceId,
    });
  }
}

module.exports = NotFoundException;
