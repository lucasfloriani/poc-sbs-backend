"use strict";

const User = use("App/Models/User");

/**
 * Resourceful controller for interacting with users
 */
class UserController {
  /**
   * Show a list of all users.
   * GET users
   */
  async index() {
    const users = await User.all();
    return users;
  }

  /**
   * Create/save a new user.
   * POST users
   */
  async store({ request }) {
    const data = request.only(["cpf", "password", "name", "email"]);
    const user = await User.create(data);
    return user;
  }

  /**
   * Display a single user.
   * GET users/:id
   */
  async show({ params }) {
    const user = await User.findOrFail(params.id);
    return user;
  }

  /**
   * Delete a user with id.
   * DELETE users/:id
   */
  async destroy({ params, auth }) {
    const user = await User.findOrFail(params.id);
    if (user.user_id !== auth.user.id) {
      return response.status(401);
    }
    await user.delete();
  }
}

module.exports = UserController;
