'use strict'

const Rating = use('App/Models/Rating')

/**
 * Resourceful controller for interacting with ratings
 */
class RatingController {
  /**
   * Create/save a new rating.
   * POST ratings
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request }) {
    const data = request.only(['gas_station_id', 'rating'])
    const rating = await Rating.create({ ...data, user_id: auth.user.id })
    return rating
  }

  /**
   * Display a single rating.
   * GET ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const rating = await Rating.findOrFail(params.id)
    return rating
  }

  /**
   * Update rating details.
   * PUT or PATCH ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, response }) {
    const rating = await Rating.findOrFail(params.id)
    if (auth.user.id !== rating.user_id) {
      return response.status(401)
    }
    rating.merge(request.only(['rating']))
    await rating.save()
    return rating
  }

  /**
   * Delete a rating with id.
   * DELETE ratings/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const rating = await Rating.findOrFail(params.id)
    if (auth.user.id !== rating.user_id) {
      return response.status(401)
    }
    await rating.delete()
  }
}

module.exports = RatingController
