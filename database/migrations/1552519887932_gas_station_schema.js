'use strict'

const Schema = use('Schema')

class GasStationSchema extends Schema {
  up() {
    this.table('gas_stations', table => {
      table
        .integer('login_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('logins')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .index()
    })
  }

  down() {
    this.table('gas_stations', table => {
      table.dropColumn('login_id')
    })
  }
}

module.exports = GasStationSchema
