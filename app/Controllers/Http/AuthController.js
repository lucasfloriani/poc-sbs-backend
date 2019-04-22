'use strict'

const Login = use('App/Models/Login')
const User = use('App/Models/User')
const GasStation = use('App/Models/GasStation')

/**
 * Resourceful controller for interacting with auth
 */
class AuthController {
  /**
   * Auth by email and password to generate JWT key.
   * POST authenticate
   */
  async authenticate({ auth, request }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    const login = await Login.findBy('email', email)

    if (login.profile === 'user') {
      const user =  await User.findBy('login_id', login.id)
      return { token, user }
    }

    const gasStation = await GasStation.findBy('login_id', login.id)
    return { token, user: gasStation }
  }
}

module.exports = AuthController
