"use strict";
const { validate } = use("Validator");
const User = use("App/Models/User");
class AuthController {
  async signin({ request, response, auth }) {
    const { email, password, username } = request.all();
    const token = await auth.attempt(email, password, {
      username,
    });
    return response.send(token);
  }

  async signup({ request, response }) {
    const validation = await validate(request.all(), {
      username: "required",
      email: "required|email",
      password: "required|min:4",
    });

    if (validation.fails()) {
      return response.send(validation.messages());
    }
    const userFound = await User.findBy("email", request.input("email"));

    if (userFound) {
      return response.send("user already exists");
    }

    const user = await User.create({
      email: request.input("email"),
      username: request.input("username"),
      password: request.input("password"),
    });

    return this.signin(...arguments);
  }
}

module.exports = AuthController;
