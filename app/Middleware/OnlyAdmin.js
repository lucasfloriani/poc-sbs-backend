'use strict'

const Admin = use('App/Models/Admin')

class OnlyAdmin {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const login = await auth.getUser()
    if (login.profile === 'admin') {
      auth.login = login
      auth.admin = await Admin.findByOrFail('login_id', login.id)
      await next()
    } else {
      return response.status(401)
    }
  }
}

module.exports = OnlyAdmin
