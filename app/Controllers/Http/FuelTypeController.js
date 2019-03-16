'use strict'

const FueldType = use('App/Models/FueldType')

/**
 * Resourceful controller for interacting with fueltypes
 */
class FuelTypeController {
  /**
   * Show a list of all fueltypes.
   * GET fueltypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const fueldTypes = await FueldType.all()
    return fueldTypes
  }

  /**
   * Display a single fueltype.
   * GET fueltypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const fueldType = await FueldType.findOrFail(params.id)
    return fueldType
  }
}

module.exports = FuelTypeController
