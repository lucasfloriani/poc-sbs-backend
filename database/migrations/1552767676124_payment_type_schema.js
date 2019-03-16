'use strict'

const Schema = use('Schema')

class PaymentTypeSchema extends Schema {
  up() {
    this.create('payment_types', table => {
      table.increments()
      table
        .string('name', 255)
        .notNullable()
        .unique()
    })
  }

  down() {
    this.drop('payment_types')
  }
}

module.exports = PaymentTypeSchema
