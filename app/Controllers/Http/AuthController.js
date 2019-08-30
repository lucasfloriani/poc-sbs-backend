'use strict'

const Login = use('App/Models/Login')
const Admin = use('App/Models/Admin')
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
      user.email = login.email
      return { token, user }
    }

    if (login.profile === 'admin') {
      const admin =  await Admin.findBy('login_id', login.id)
      admin.email = login.email
      return { token, user: admin }
    }

    const gasStation = await GasStation
      .query()
      .where('status', 'active')
      .where('login_id', login.id)
      .first()
    gasStation.email = login.email
    return { token, user: gasStation }
  }
}

module.exports = AuthController
