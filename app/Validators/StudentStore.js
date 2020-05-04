"use strict";

class StudentStore {
  get rules() {
    return {
      courseId: "required",
    };
  }

  get messages() {
    return {
      "courseId.required": "ID de curso requerido.",
    };
  }

  async fails(errorMessages = []) {
    const { message } = errorMessages[0] || { message: "Datos inválidos." };
    return this.ctx.response.status(400).json({ error: message });
  }
}

module.exports = StudentStore;
