'use strict'

const Login = use('App/Models/Login')
const Admin = use('App/Models/Admin')
const User = use('App/Models/User')
const GasStation = use('App/Models/GasStation')

const Mail = use('Mail')
const moment = require('moment')
const crypto = require('crypto')

/**
 * Resourceful controller for interacting with auth
 */
class AuthController {
  /**
   * Auth by email and password to generate JWT key.
   * POST authenticate
   */
  async authenticate({ auth, request, response }) {
    try {
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
        .where('login_id', login.id)
        .first()

      if (gasStation.status === 'inactive') {
        return response.status(401).send({
          errors: [{ detail: 'Conta do posto de combustivel não está ativa' }]
        })
      }

      gasStation.email = login.email
      return { token, user: gasStation }
    } catch (e) {
      return response.status(401).send({
        errors: [{ detail: 'Usuário não foi encontrado' }]
      })
    }
  }

  async forgotPassword({ request }) {
    try {
      const { email } = request.only(['email'])
      const login = await Login.findByOrFail('email', email)

      const token = await crypto.randomBytes(10).toString('hex')

      login.token = token
      login.token_created_at = new Date()
      await login.save()

      await Mail.send(
        'emails.recover',
        { login, recoverURL: `${Env.get('SITE_URL')}/recovery-password/${token}` },
        message => message.subject('Octano - Recuperação de senha').from(Env.get('SENDER_EMAIL')).to(login.email)
      )

      return login.token
    } catch (e) {
      console.error(e)
    }
  }

  async updatePassword({ request, response }) {
    try {
      const { token, password } = request.only(['token', 'password'])
      const login = await Login.findByOrFail('token', token)

      const tokenExpired = moment().subtract(2, 'hours').isAfter(login.token_created_at)
      if (tokenExpired) {
        return response.status(401).send({ message: { error: 'Token expirado' } })
      }

      login.password = password
      login.token = null
      await login.save()
    } catch (e) {
      console.error(e)
    }
  }
}

module.exports = AuthController
