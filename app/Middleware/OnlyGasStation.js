'use strict'

const GasStation = use('App/Models/GasStation')

class OnlyGasStation {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ auth, response }, next) {
    const login = await auth.getUser()
    if (login.profile === 'gas-station') {
      auth.login = login
      auth.gasStation = await GasStation.findByOrFail('login_id', login.id)
      await next()
    } else {
      return response.status(401)
    }
  }
}

module.exports = OnlyGasStation
