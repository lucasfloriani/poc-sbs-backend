'use strict'

const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.table('users', table => {
      table.dropColumn('password')
      table.dropColumn('email')
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
    this.table('users', table => {
      table.string('password', 60).notNullable()
      table
        .string('email', 150)
        .notNullable()
        .unique()
      table.dropColumn('login_id')
    })
  }
}

module.exports = UserSchema
