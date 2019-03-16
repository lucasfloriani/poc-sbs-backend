'use strict'

const Schema = use('Schema')

class TokenSchema extends Schema {
  up() {
    this.drop('tokens')
  }

  down() {
    this.table('tokens', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .string('token', 255)
        .notNullable()
        .unique()
        .index()
      table.string('type', 80).notNullable()
      table.boolean('is_revoked').defaultTo(false)
      table.timestamps()
    })
  }
}

module.exports = TokenSchema
