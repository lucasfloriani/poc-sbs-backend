'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoginSchema extends Schema {
  up () {
    this.table('logins', (table) => {
      table.string('token')
      table.timestamp('token_created_at')
    })
  }

  down () {
    this.table('logins', (table) => {
      table.dropColumn('token')
      table.dropColumn('token_created_at')
    })
  }
}

module.exports = LoginSchema
