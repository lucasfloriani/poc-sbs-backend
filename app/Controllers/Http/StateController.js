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
    const states = await State.all()
    return states
  }

  /**
   * Display a single state.
   * GET states/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const state = await State.findOrFail(params.id)
    return state
  }
}

module.exports = StateController
