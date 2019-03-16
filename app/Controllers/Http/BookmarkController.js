'use strict'

const Bookmark = use('App/Models/Bookmark')

/**
 * Resourceful controller for interacting with bookmarks
 */
class BookmarkController {
  /**
   * Show a list of all bookmarks.
   * GET bookmarks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const bookmarks = await Bookmark.query()
      .select(
        'booksmarks.id',
        'gas_stations.id as gas_station_id',
        'gas_stations.business_name',
        'gas_stations.fantasy_name',
        'gas_stations.cnpj',
        'gas_stations.anp'
      )
      .where('user_id', auth.user.id)
      .innerJoin('gas_stations', 'bookmarks.gas_station_id', 'gas_stations.id')
      .fetch()
    return bookmarks
  }

  /**
   * Create/save a new bookmark.
   * POST bookmarks
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ auth, request }) {
    const data = request.only(['gas_station_id'])
    const bookmark = await Bookmark.create({ ...data, user_id: auth.user.id })
    return bookmark
  }

  /**
   * Delete a bookmark with id.
   * DELETE bookmarks/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ auth, params, response }) {
    const bookmark = await Bookmark.findOrFail(params.id)
    if (auth.user.id !== bookmark.user_id) {
      return response.status(401)
    }
    await bookmark.delete()
  }
}

module.exports = BookmarkController
