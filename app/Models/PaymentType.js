'use strict'

const Model = use('Model')

class PaymentType extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  gasStations() {
    return this.belongsToMany('App/Models/GasStation').pivotModel(
      use('App/Models/GasStationPaymentType')
    )
  }
}

module.exports = PaymentType
