'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class OnlyUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const login = await auth.getUser()
    if (login.profile === 'user') {
      auth.login = login
      await next()
    } else {
      return response.status(401)
    }
  }
}

module.exports = OnlyUser