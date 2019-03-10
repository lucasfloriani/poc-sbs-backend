'use strict'

const Schema = use('Schema')

class StateSchema extends Schema {
  up() {
    this.create('states', table => {
      table.increments()
      table
        .string('name', 255)
        .notNullable()
        .unique()
      table
        .string('abbreviation', 2)
        .notNullable()
        .unique()
    })
  }

  down() {
    this.drop('states')
  }
}

module.exports = StateSchema
