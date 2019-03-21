'use strict'

const Model = use('Model')

class GasStationPaymentType extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  static get table() {
    return 'gas_station_payment_type'
  }

  gasStation() {
    return this.belongsTo('App/Models/GasStation')
  }

  paymentType() {
    return this.belongsTo('App/Models/PaymentType')
  }

  /**
   * Override this method or it will try to return id on save.
   */
  static get primaryKey() {
    return null
  }

  static get incrementing() {
    return false
  }
}

module.exports = GasStationPaymentType
