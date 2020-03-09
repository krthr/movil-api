"use strict";

const { ServiceProvider } = require("@adonisjs/fold");

class FakerProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("Faker", () => {
      const a = require("./index");

      return new a();
    });
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
    //
  }
}

module.exports = FakerProvider;
