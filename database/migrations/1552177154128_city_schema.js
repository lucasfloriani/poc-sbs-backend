'use strict'

const Schema = use('Schema')

class CitySchema extends Schema {
  up() {
    this.create('cities', table => {
      table.increments()
      table.string('name', 255).notNullable()
      table
        .integer('state_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('states')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
        .index()
    })
  }

  down() {
    this.drop('cities')
  }
}

module.exports = CitySchema
