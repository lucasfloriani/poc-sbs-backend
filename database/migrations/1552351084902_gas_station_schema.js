'use strict'

const Schema = use('Schema')

class GasStationSchema extends Schema {
  up() {
    this.create('gas_stations', table => {
      table.increments()
      table
        .string('cnpj', 18)
        .notNullable()
        .unique()
      table.string('business_name').notNullable()
      table
        .string('fantasy_name')
        .notNullable()
        .index()
      table.string('state_registration').notNullable()
      table.string('anp').notNullable()
      table.string('cep').notNullable()
      table.string('address').notNullable()
      table.string('complement')
      table.string('neighborhood').notNullable()
      table.string('geo_location').notNullable()
      table
        .integer('city_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('cities')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .index()
      table
        .integer('state_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('states')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .index()
      table.timestamps()
    })
  }

  down() {
    this.drop('gas_stations')
  }
}

module.exports = GasStationSchema
