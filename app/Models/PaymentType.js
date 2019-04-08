'use strict'

const Model = use('Model')

class PaymentType extends Model {
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

module.exports = PaymentType
