'use strict'

const Database = use('Database')
const PriceFuel = use('App/Models/PriceFuel')
const PriceFuelHistory = use('App/Models/PriceFuelHistory')

/**
 * Resourceful controller for interacting with pricefuels
 */
class PriceFuelController {
  /**
   * Show a list of all pricefuels.
   * GET pricefuels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const priceFuels = await PriceFuel.query()
      .with('fuelType')
      .with('gasStation')
      .with('paymentType')
      .fetch()

    return priceFuels
  }

  /**
   * Create/save a new pricefuel.
   * POST pricefuels
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request, response }) {
    const trx = await Database.beginTransaction()
    const priceFuelData = {
      ...request.only([
        'price',
        'gas_station_id',
        'payment_type_id',
        'fuel_type_id'
      ])
    }
    if (priceFuelData.gas_station_id !== auth.login.id) {
      return response.status(401)
    }

    const priceFuel = await PriceFuel.create(priceFuelData, tx)
    await PriceFuelHistory.create({ ...priceFuelData, type: 'create' }, trx)
    trx.commit()

    return priceFuel
  }

  /**
   * Display a single pricefuel.
   * GET pricefuels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const priceFuel = await PriceFuel.findOrFail(params.id)
    return priceFuel
  }

  /**
   * Update pricefuel details.
   * PUT or PATCH pricefuels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const trx = Database.beginTransaction()
    const priceFuel = await PriceFuel.findOrFail(params.id)
    if (priceFuel.gas_station_id !== auth.login.id) {
      return response.status(401)
    }

    priceFuel.merge(request.only(['price', 'payment_type_id', 'fuel_type_id']))
    await priceFuel.save(trx)
    await PriceFuelHistory.create({ ...priceFuel, type: 'update' }, trx)
    trx.commit()

    return priceFuel
  }

  /**
   * Delete a pricefuel with id.
   * DELETE pricefuels/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const priceFuel = await PriceFuel.findOrFail(params.id)
    if (priceFuel.gas_station_id !== auth.login.id) {
      return response.status(401)
    }
    const trx = await Database.beginTransaction()
    await PriceFuelHistory.create({ ...priceFuel, type: 'delete' }, trx)
    await priceFuel.delete(trx)
    trx.commit()
  }
}

module.exports = PriceFuelController
