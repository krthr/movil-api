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
    let userJwt;

    try {
      userJwt = await auth.getUser();
    } catch (e) {
      return response.status(403).json({
        error: "Token inválido.",
      });
    }

    if (userJwt && userJwt.username == dbId) {
      await next();
    } else {
      response.status(403).json({
        error: "No tiene acceso a esta información.",
      });
    }
  }
}

module.exports = UserPrivilegesDetector;
