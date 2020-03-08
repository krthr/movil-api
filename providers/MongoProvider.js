"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const mongoose = require("mongoose");
const path = require("path");

class MongoProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("App/Models/Person", () =>
      require("../app/Models/Person")
    );

    this.app.singleton("App/Models/Student", () =>
      require("../app/Models/Student")
    );

    this.app.singleton("App/Models/Course", () =>
      require("../app/Models/Course")
    );
  }

  /**
   * Attach context getter when all providers have
   * been registered
   *
   * @method boot
   *
   * @return {void}
   */
  boot() {
    const Env = use("Env");

    mongoose.connect(Env.get("MONGODB_URI"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });
  }
}

module.exports = MongoProvider;
