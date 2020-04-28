"use strict";
const User = use("App/Models/User");
class AuthController {
  async checkToken({ request, response, auth }) {
    try {
      await auth.check();
      response.json({ valid: true });
    } catch (error) {
      response.json({ valid: false });
    }
  }

  async signin({ request, response, auth }) {
    const { email, password } = request.all();

    try {
      const { type, token } = await auth.attempt(email, password);
      const user = await User.findBy("email", email);

      return response.json({
        type,
        token,
        username: user.username,
        name: user.name,
        email: user.email,
      });
    } catch (e) {
      if (e.name === "UserNotFoundException") {
        return response.status(403).json({
          error: "No existe usuario con correo " + email,
        });
      }

      response.status(403).json({
        error: "Contraseña inválida.",
      });
    }
  }

  async signup({ request, response }) {
    const userFound = await User.findBy("email", request.input("email"));

    if (userFound) {
      return response.status(409).send({
        error: "El correo electrónico ya se encuentra en uso.",
      });
    }

    const user = await User.create({
      email: request.input("email"),
      username: request.input("username"),
      password: request.input("password"),
      name: request.input("name"),
    });

    return this.signin(...arguments);
  }

  async isLogged({ request, response }) {
    return response.json({
      hi: Date.now(),
    });
  }
}

module.exports = AuthController;
