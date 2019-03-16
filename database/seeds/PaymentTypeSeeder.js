'use strict'

const PaymentType = use('App/Models/PaymentType')

class PaymentTypeSeeder {
  async run() {
    const paymentTypes = [
      { name: 'Dinheiro' },
      { name: 'Crédito' },
      { name: 'Débito' }
    ]

    for await (const paymentType of paymentTypes) {
      await PaymentType.findOrCreate({ name: paymentType.name }, paymentType)
    }
  }
}

module.exports = PaymentTypeSeeder
