'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GasstationPaymenttypeSchema extends Schema {
  up() {
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

  down() {
    this.drop('gas_station_payment_type')
  }
}

module.exports = GasstationPaymenttypeSchema
