'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplaintSchema extends Schema {
  up() {
    this.create('complaints', table => {
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
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index()
      table.text('message').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('complaints')
  }
}

module.exports = ComplaintSchema
