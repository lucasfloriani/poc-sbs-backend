'use strict'

const Schema = use('Schema')

class GasstationPaymenttypeSchema extends Schema {
  up() {
    this.drop('gas_station_payment_type')
  }

  down() {
    this.create('gas_station_payment_type', table => {
      table
        .integer('gas_station_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('gas_stations')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index()
      table
        .integer('payment_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('payment_types')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .index()
    })
  }
}

module.exports = GasstationPaymenttypeSchema
