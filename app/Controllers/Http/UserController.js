'use strict'

const Database = use('Database')
const Login = use('App/Models/Login')
const User = use('App/Models/User')

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index() {
    const users = await User.query()
      .select(
        'users.id',
        'users.cpf',
        'logins.email',
        'users.name',
        'users.created_at',
        'users.updated_at'
      )
      .innerJoin('logins', 'users.login_id', 'logins.id')
      .fetch()
    return users
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show({ auth, params }) {
    const user = await User.findOrFail(params.id)
    user.email = auth.login.email
    return user
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ auth, request }) {
    const trx = await Database.beginTransaction()
    const { name, cpf, email, password } = request.all()
    const loginData = {
      email,
      password,
      profile: 'user'
    }
    const login = await Login.create(loginData, trx)

    const userData = { cpf, name, login_id: login.id }
    const user = await User.create(userData, trx)
    user.email = login.email
    trx.commit()

    const token = await auth.attempt(email, password)
    return { token, user }
  }

  /**
   * Update user details.
   * PUT or PATCH users/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const user = await User.findOrFail(params.id)
    if (user.login_id !== auth.login.id) {
      return response.status(401)
    }
    user.merge(request.only(['cpf', 'name']))
    await user.save()
    user.email = auth.login.email
    return user
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ params, auth }) {
    const user = await User.findOrFail(params.id)
    const login = await Login.findOrFail(user.login_id)
    if (user.login_id !== auth.login.id) {
      return response.status(401)
    }
    const trx = await Database.beginTransaction()
    await user.delete(trx)
    await login.delete(trx)
    trx.commit()
  }
}

module.exports = UserController
