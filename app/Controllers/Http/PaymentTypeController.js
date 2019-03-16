'use strict'

const PaymentType = use('App/Models/PaymentType')

/**
 * Resourceful controller for interacting with paymenttypes
 */
class PaymentTypeController {
  /**
   * Show a list of all paymenttypes.
   * GET paymenttypes
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index() {
    const paymentTypes = await PaymentType.all()
    return paymentTypes
  }

  /**
   * Display a single paymenttype.
   * GET paymenttypes/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const paymentType = await PaymentType.findOrFail(params.id)
    return paymentType
  }
}

module.exports = PaymentTypeController
