"use strict";

const { ServiceProvider } = require("@adonisjs/fold");
const axios = require("axios").default;

class FakerProvider extends ServiceProvider {
  /**
   * Register namespaces to the IoC container
   *
   * @method register
   *
   * @return {void}
   */
  register() {
    this.app.singleton("Faker", () => ({
      async random(n = 1) {
        const { results } = await axios
          .get(`https://randomuser.me/api?results=${n}`)
          .then(r => r.data);

        return results.slice(0, n);
      }
    }));
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
