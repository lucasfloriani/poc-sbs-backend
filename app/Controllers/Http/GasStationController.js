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
  async index({ request }) {
    const queryParams = request.get()
    const gasStations = GasStation.query()
      .with('bookmarks')
      .with('complaints')
      .with('city')
      .with('state')
      .with('login')
      .with('ratings')
      .with('priceFuels', (builder) => {
        builder.with('fuelType', (fuelTypeBuilder) => {
          if (queryParams.fuelType) {
            fuelTypeBuilder.where('name', queryParams.fuelType)
          }
        })
        builder.with('paymentType', (paymentTypeBuilder) => {
          if (queryParams.paymentType) {
            paymentTypeBuilder.where('name', queryParams.paymentType)
          }
        })
      })
      .where(function () {
        if (queryParams.name) {
          this.where('fantasy_name', 'LIKE', `%${queryParams.name}%`)
        }
      })
      .whereHas('city', (builder) => {
        if (queryParams.city) {
          builder.where('id', queryParams.city)
        }
      }, '=', 1)
      .whereHas('state', (builder) => {
        if (queryParams.state) {
          builder.where('id', queryParams.state)
        }
      }, '=', 1)
      .whereHas('priceFuels', (priceFuelsBuilder) => {
        if (queryParams.fuelType) {
          priceFuelsBuilder.whereHas('fuelType', (fuelTypeBuilder) => {
            fuelTypeBuilder.where('name', queryParams.fuelType)
          })
        }
        if (queryParams.paymentType) {
          priceFuelsBuilder.whereHas('paymentType', (paymentTypeBuilder) => {
            paymentTypeBuilder.where('name', queryParams.paymentType)
          })
        }
        if (queryParams.minPrice) {
          priceFuelsBuilder.where('price', '>=', queryParams.minPrice)
        }
        if (queryParams.maxPrice) {
          priceFuelsBuilder.where('price', '<=', queryParams.maxPrice)
        }
      })

    if (queryParams.orderType) {
      switch (queryParams.orderType) {
        case 'lowestPrice':
          gasStations
            .leftJoin('price_fuels as p','gas_stations.id','p.gas_station_id')
            .orderBy('p.price','asc')
          break
        case 'highestPrice':
          gasStations
            .leftJoin('price_fuels as p','gas_stations.id','p.gas_station_id')
            .orderBy('p.price','desc')
          break
        case 'nearest':
          break
        case 'lessBookmarked':
          gasStations
            .select('gas_stations.*', Database.raw("COUNT(b.*) as media"))
            .leftJoin('bookmarks as b', 'gas_stations.id', 'b.gas_station_id')
            .groupBy('gas_stations.id')
            .orderBy('media', 'asc')
          break
        case 'mostBookmarked':
          gasStations
            .select('gas_stations.*', Database.raw("COUNT(b.*) as media"))
            .leftJoin('bookmarks as b', 'gas_stations.id', 'b.gas_station_id')
            .groupBy('gas_stations.id')
            .orderBy('media', 'desc')
            break
        case 'lessComplained':
          gasStations
            .select('gas_stations.*', Database.raw('COUNT(c.*) as media'))
            .leftJoin('complaints as c', 'gas_stations.id', 'c.gas_station_id')
            .groupBy('gas_stations.id')
            .orderBy('media', 'asc')
          break
        case 'mostComplained':
          gasStations
            .select('gas_stations.*', Database.raw('COUNT(c.*) as media'))
            .leftJoin('complaints as c', 'gas_stations.id', 'c.gas_station_id')
            .groupBy('gas_stations.id')
            .orderBy('media', 'desc')
          break
      }
    }

    if (queryParams.rating) {
      gasStations.whereHas('ratings', (builder) => {
        builder
          .select(Database.raw("AVG(rating) as media"))
          .groupBy('gas_station_id')
          .having(Database.raw('AVG(rating)'), '=', queryParams.rating)
      })
    }

    return await gasStations.fetch()
  }

  /**
   * Show a list of all gasstations that user has bookmarked
   * GET gas-stations/bookmark
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexBookmark({ auth }) {
    return await GasStation.query()
      .with('bookmarks')
      .with('complaints')
      .with('city')
      .with('state')
      .with('login')
      .with('ratings')
      .with('priceFuels')
      .whereHas('bookmarks', (builder) => {
        builder.where('user_id', auth.user.id)
      })
      .fetch()
  }

  /**
   * Show a list of all gasstations that user has complaint
   * GET gas-stations/complaint
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexComplaint({ auth }) {
    return await GasStation.query()
      .with('bookmarks')
      .with('complaints')
      .with('city')
      .with('state')
      .with('login')
      .with('ratings')
      .with('priceFuels')
      .whereHas('complaints', (builder) => {
        builder.where('user_id', auth.user.id)
      })
      .fetch()
  }

  /**
   * Show a list of all gasstations that user has rating
   * GET gas-stations/rating
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async indexRating({ auth }) {
    return await GasStation.query()
      .with('bookmarks')
      .with('complaints')
      .with('city')
      .with('state')
      .with('login')
      .with('ratings')
      .with('priceFuels')
      .whereHas('ratings', (builder) => {
        builder.where('user_id', auth.user.id)
      })
      .fetch()
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
  async show({ params }) {
    return await GasStation.query()
      .where('id', params.id)
      .with('bookmarks')
      .with('complaints')
      .with('city')
      .with('state')
      .with('login')
      .with('ratings')
      .with('priceFuels')
      .with('priceFuelHistories', (builder) => {
        builder.with('fuelType')
        builder.with('paymentType')
      })
      .first()
  }

  /**
   * Update gasstation details.
   * PUT or PATCH gasstations/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request }) {
    const gasStation = await GasStation.findOrFail(params.id)
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
