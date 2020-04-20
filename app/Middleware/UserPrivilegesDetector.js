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
    const { dbId } = params;
    const userJwt = await auth.getUser();

    if (userJwt.username == dbId) {
      await next();
    } else {
      response.send("No Privileges To Access This Information");
    }
  }
}

module.exports = UserPrivilegesDetector;
