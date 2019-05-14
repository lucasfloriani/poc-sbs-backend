'use strict'

const Complaint = use('App/Models/Complaint')

/**
 * Resourceful controller for interacting with complaints
 */
class ComplaintController {
  /**
   * Show a list of all complaints of user.
   * GET complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async userIndex({ auth }) {
    const userComplaints = await Complaint.query()
      .select(
        'complaints.message',
        'complaints.gas_station_id',
        'gas_stations.business_name',
        'gas_stations.fantasy_name',
        'gas_stations.cnpj',
        'gas_stations.anp'
      )
      .where('user_id', auth.user.id)
      .innerJoin('gas_stations', 'complaints.gas_station_id', 'gas_stations.id')
      .fetch()
    return userComplaints
  }

  /**
   * Show a list of all complaints against Gas Station.
   * GET complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async gasStationindex({ params }) {
    const gasStationcomplaints = await Complaint.query()
      .select('message')
      .where('gas_station_id', params.id)
      .fetch()
    return gasStationcomplaints
  }

  /**
   * Display a single complaint.
   * GET complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const complaint = await Complaint.findOrFail(params.id)
    return complaint
  }

  /**
   * Create/save a new complaint.
   * POST complaints
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request }) {
    const data = request.only(['gas_station_id', 'message'])
    const complaint = await Complaint.create({ ...data, user_id: auth.user.id })
    return complaint
  }

  /**
   * Update complaint details.
   * PUT or PATCH complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ auth, params, request, response }) {
    const complaint = await Complaint.findOrFail(params.id)
    if (auth.user.id != complaint.user_id) {
      return response.status(401)
    }
    complaint.merge(request.only(['message']))
    await complaint.save()
    return complaint
  }

  /**
   * Delete a complaint with id.
   * DELETE complaints/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const complaint = await Complaint.findOrFail(params.id)
    if (auth.user.id != complaint.user_id) {
      return response.status(401)
    }
    await complaint.delete()
    return complaint
  }
}

module.exports = ComplaintController
