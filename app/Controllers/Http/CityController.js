'use strict'

const City = use('App/Models/City')

/**
 * Resourceful controller for interacting with cities
 */
class CityController {
  /**
   * Show a list of all cities.
   * GET cities
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ params }) {
    const cities = await City
      .query()
      .where('state_id', params.stateID)
      .orderBy('name', 'asc')
      .fetch()
    return cities
  }
}

module.exports = CityController
