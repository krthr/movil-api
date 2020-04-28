"use strict";

class Login {
  get rules() {
    return {
      email: "required|email",
      password: "required",
    };
  }

  get messages() {
    return {
      "email.required": "Correo electrónico requerido",
      "email.email": "Correo electrónico inválido",
      "password.required": "Contraseña requerida",
    };
  }

  async fails(errorMessages = []) {
    const { message } = errorMessages[0] || { message: "Datos inválidos." };
    return this.ctx.response.status(400).json({ error: message });
  }
}

module.exports = Login;
