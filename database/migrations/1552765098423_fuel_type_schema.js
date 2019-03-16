'use strict'

const Schema = use('Schema')

class FuelTypeSchema extends Schema {
  up() {
    this.create('fuel_types', table => {
      table.increments()
      table
        .string('name', 255)
        .notNullable()
        .unique()
    })
  }

  down() {
    this.drop('fuel_types')
  }
}

module.exports = FuelTypeSchema
