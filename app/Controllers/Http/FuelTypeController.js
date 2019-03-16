'use strict'

const FuelType = use('App/Models/FuelType')

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
    const fuelTypes = await FuelType.all()
    return fuelTypes
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
    const fuelType = await FuelType.findOrFail(params.id)
    return fuelType
  }
}

module.exports = FuelTypeController
