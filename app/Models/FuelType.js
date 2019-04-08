'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class FuelType extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  priceFuels() {
    return this.hasMany('App/Models/PriceFuel')
  }

  priceFuelHistories() {
    return this.hasMany('App/Models/PriceFuelHistory')
  }
}

module.exports = FuelType
