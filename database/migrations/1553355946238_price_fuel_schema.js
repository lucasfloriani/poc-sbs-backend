'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PriceFuelSchema extends Schema {
  up() {
    this.create('price_fuels', table => {
      table.increments()
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
      table
        .integer('fuel_type_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('fuel_types')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .index()
      table
        .decimal('price', 5, 3)
        .unsigned()
        .notNullable()
        .index()
      table.unique(['gas_station_id', 'payment_type_id', 'fuel_type_id'])
    })
  }

  down() {
    this.drop('price_fuels')
  }
}

module.exports = PriceFuelSchema
