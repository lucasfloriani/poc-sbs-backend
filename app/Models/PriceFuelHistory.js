'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class PriceFuelHistory extends Model {
  static get primaryKey() {
    return null
  }

  static get incrementing() {
    return false
  }

  fuelType() {
    return this.belongsTo('App/Models/FuelType')
  }

  gasStation() {
    return this.belongsTo('App/Models/GasStation')
  }

  paymentType() {
    return this.belongsTo('App/Models/PaymentType')
  }
}

module.exports = PriceFuelHistory
