'use strict'

const Schema = use('Schema')

class LoginSchema extends Schema {
  up() {
    this.create('logins', table => {
      table.increments()
      table
        .string('email')
        .notNullable()
        .unique()
      table.string('password').notNullable()
      table.enu('profile', ['user', 'gas-station']).notNullable()
    })
  }

  down() {
    this.drop('logins')
  }
}

module.exports = LoginSchema
