'use strict'

const User = use('App/Models/User')

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
      auth.user = await User.findByOrFail('login_id', login.id)
      await next()
    } else {
      return response.status(401)
    }
  }
}

module.exports = OnlyUser
