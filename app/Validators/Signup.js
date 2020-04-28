"use strict";

class Signup {
  get rules() {
    return {
      username: "required",
      email: "required|email",
      name: "required|min:2",
      password: "required|min:4",
    };
  }

  get messages() {
    return {
      "username.required": "Nombre de usuario requerido",
      "email.required": "Correo electrónico requerido",
      "email.email": "Correo electrónico inválido",
      "name.required": "Nombre requerido",
      "name.min": "Nombre demasiado corto",
      "password.required": "Contraseña requerida",
      "password.min": "Contraseña demasiado corta. Min: 4 caract.",
    };
  }

  async fails(errorMessages = []) {
    const { message } = errorMessages[0] || { message: "Datos inválidos." };
    return this.ctx.response.status(400).json({ error: message });
  }
}

module.exports = Signup;
