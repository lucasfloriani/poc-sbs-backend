'use strict'

const Schema = use('Schema')

class RatingSchema extends Schema {
  up() {
    this.create('ratings', table => {
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
      table.integer('rating').notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('ratings')
  }
}

module.exports = RatingSchema
