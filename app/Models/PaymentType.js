'use strict'

const Model = use('Model')

class PaymentType extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }
}

module.exports = PaymentType
