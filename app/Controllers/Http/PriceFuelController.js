'use strict'

const Database = use('Database')
const PriceFuel = use('App/Models/PriceFuel')
const PriceFuelHistory = use('App/Models/PriceFuelHistory')
const SpreadSheet = use('SpreadSheet')

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
  async index({ params }) {
    const priceFuels = await PriceFuel.query()
      .with('fuelType')
      .with('gasStation')
      .with('paymentType')
      .where('gas_station_id', params.gasStation)
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
    const priceFuelData = {
      ...request.only([
        'price',
        'gas_station_id',
        'payment_type_id',
        'fuel_type_id'
      ])
    }

    if (priceFuelData.gas_station_id != auth.gasStation.id) {
      return response.status(401)
    }

    const trx = await Database.beginTransaction()
    const priceFuel = await PriceFuel.create(priceFuelData, trx)
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
    const priceFuel = await PriceFuel.findOrFail(params.id)
    if (priceFuel.gas_station_id != auth.gasStation.id) {
      return response.status(401)
    }
    priceFuel.merge(request.only(['price', 'payment_type_id', 'fuel_type_id']))

    const trx = await Database.beginTransaction()
    await priceFuel.save(trx)
    await PriceFuelHistory.create({
      gas_station_id: priceFuel.gas_station_id,
      payment_type_id: priceFuel.payment_type_id,
      fuel_type_id: priceFuel.fuel_type_id,
      price: priceFuel.price,
      type: 'update',
    }, trx )
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
    if (priceFuel.gas_station_id !== auth.gasStation.id) {
      return response.status(401)
    }

    const trx = await Database.beginTransaction()
    await PriceFuelHistory.create({
      gas_station_id: priceFuel.gas_station_id,
      payment_type_id: priceFuel.payment_type_id,
      fuel_type_id: priceFuel.fuel_type_id,
      price: priceFuel.price,
      type: 'delete',
    }, trx)
    await priceFuel.delete(trx)
    trx.commit()
  }

  /**
   * Create a csv with all price fuel histories in database.
   * GET pricefuels/relatory
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async relatory({ request, response }) {
    const ss = new SpreadSheet(response, 'xls')

    const priceFuelHistories = await PriceFuelHistory
      .query()
      .with('fuelType')
      .with('gasStation')
      .with('paymentType')
      .fetch()
    const data = []

    data.push([
      'Razão social',
      'Nome fantasia',
      'CNPJ',
      'Tipo de combustível',
      'Tipo de pagamento',
      'Preço',
      'Ação',
      'Criado em',
    ])

    priceFuelHistories.toJSON().forEach((priceFuelHistory) => {
      data.push([
        priceFuelHistory.gasStation.business_name,
        priceFuelHistory.gasStation.fantasy_name,
        priceFuelHistory.gasStation.cnpj,
        priceFuelHistory.fuelType.name,
        priceFuelHistory.paymentType.name,
        priceFuelHistory.price,
        priceFuelHistory.type,
        priceFuelHistory.created_at,
      ])
    })

    ss.addSheet('Histórico de preço', data)
    ss.download('historico-de-preco')
  }
}

module.exports = PriceFuelController
