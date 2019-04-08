'use strict'

const Database = use('Database')
const GasStation = use('App/Models/GasStation')
const Login = use('App/Models/Login')

/**
 * Resourceful controller for interacting with gasstations
 */
class GasStationController {
  /**
   * Show a list of all gasstations.
   * GET gasstations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const gasStations = await GasStation.query()
      .select(
        'gas_stations.id',
        'logins.email',
        'gas_stations.cnpj',
        'gas_stations.business_name',
        'gas_stations.fantasy_name',
        'gas_stations.state_registration',
        'gas_stations.anp',
        'gas_stations.cep',
        'gas_stations.address',
        'gas_stations.complement',
        'gas_stations.neighborhood',
        'gas_stations.geo_location',
        'gas_stations.created_at',
        'gas_stations.updated_at',
        'gas_stations.city_id',
        'cities.name as city_name',
        'gas_stations.state_id',
        'states.name as state_name'
      )
      .innerJoin('logins', 'gas_stations.login_id', 'logins.id')
      .innerJoin('cities', 'gas_stations.city_id', 'cities.id')
      .innerJoin('states', 'gas_stations.state_id', 'states.id')
      .fetch()
    return gasStations
  }

  /**
   * Create/save a new gasstation.
   * POST gasstations
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request }) {
    const trx = await Database.beginTransaction()
    const loginData = {
      ...request.only(['email', 'password']),
      profile: 'gas-station'
    }
    const login = await Login.create(loginData, trx)

    const gasStationData = {
      ...request.only([
        'cnpj',
        'business_name',
        'fantasy_name',
        'state_registration',
        'anp',
        'cep',
        'address',
        'complement',
        'neighborhood',
        'geo_location',
        'city_id',
        'state_id'
      ]),
      login_id: login.id
    }
    const gasStation = await GasStation.create(gasStationData, trx)
    trx.commit()

    return gasStation
  }

  /**
   * Display a single gasstation.
   * GET gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ auth, params }) {
    // #TODO: Alterar o email, está pegando sempre o do próprio usuário e não
    // o email do posto no banco de dados
    const gasStation = await GasStation.findOrFail(params.id)
    gasStation.email = auth.login.email
    return gasStation
  }

  /**
   * Update gasstation details.
   * PUT or PATCH gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const gasStation = await GasStation.findOrFail(params.id)
    if (gasStation.login_id !== auth.login.id) {
      return response.status(401)
    }
    gasStation.merge(
      request.only([
        'cnpj',
        'business_name',
        'fantasy_name',
        'state_registration',
        'anp',
        'cep',
        'address',
        'complement',
        'neighborhood',
        'geo_location',
        'city_id',
        'state_id'
      ])
    )
    await gasStation.save()
    gasStation.email = auth.login.email

    return gasStation
  }

  /**
   * Delete a gasstation with id.
   * DELETE gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, response, auth }) {
    const gasStation = await GasStation.findOrFail(params.id)
    const login = await Login.findOrFail(gasStation.login_id)
    if (gasStation.login_id !== auth.login.id) {
      return response.status(401)
    }
    const trx = await Database.beginTransaction()
    await gasStation.delete(trx)
    await login.delete(trx)
    trx.commit()
  }
}

module.exports = GasStationController
