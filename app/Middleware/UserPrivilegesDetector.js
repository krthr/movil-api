"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserPrivilegesDetector {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params, response, auth }, next) {
    try {
      const { dbId } = params;
      var userJwt = await auth.getUser();
      if (userJwt.username.toString() == dbId) {
        await next();
      } else {
        response.send("No Privileges To Access This Information");
      }
    } catch (error) {
      console.log(error);
      response.send("Credentials missing");
    }
  }
}

module.exports = UserPrivilegesDetector;
