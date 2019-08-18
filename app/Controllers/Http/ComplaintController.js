'use strict'

const Complaint = use('App/Models/Complaint')

/**
 * Resourceful controller for interacting with complaints
 */
class ComplaintController {
  /**
   * Show a list of all complaints.
   * GET fueltypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const complaints = await Complaint.query()
      .with('gasStation')
      .with('user')
      .fetch()
    return complaints
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
}

module.exports = ComplaintController
