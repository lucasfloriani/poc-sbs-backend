'use strict'

/**
 * Resourceful controller for interacting with auth
 */
class AuthController {
  /**
   * Auth by email and password to generate JWT key.
   * POST authenticate
   */
  async authenticate({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }
}

module.exports = AuthController
