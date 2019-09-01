'use strict'

const State = use('App/Models/State')

/**
 * Resourceful controller for interacting with states
 */
class StateController {
  /**
   * Show a list of all states.
   * GET states
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const states = await State
      .query()
      .orderBy('name', 'asc')
      .fetch()
    return states
  }
}

module.exports = StateController
