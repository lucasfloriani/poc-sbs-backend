'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GasStationSchema extends Schema {
  up () {
    this.table('gas_stations', (table) => {
      table.enu('status', ['active', 'inactive'])
        .notNullable()
        .defaultTo('active')
    })
  }

  down () {
    this.table('gas_stations', (table) => {
      table.dropColumn('status')
    })
  }
}

module.exports = GasStationSchema
