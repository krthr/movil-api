"use strict";
const { validate } = use("Validator");
const User = use("App/Models/User");
class AuthController {
  async checkToken({ request, response, auth }) {
    try {
      await auth.check()
      response.json({"valid":true})
    } catch (error) {
      response.json({"valid":false})
    }
  }
  
  async signin({ request, response, auth }) {
    const { email, password } = request.all();

    const token = await auth.attempt(email, password);

    const user = await User.findBy("email", email);

    return response.json({
      ...token,
      username: user.username,
      name: user.name,
    });
  }

  async signup({ request, response }) {
    const validation = await validate(request.all(), {
      username: "required",
      email: "required|email",
      name: "required|min:2",
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
