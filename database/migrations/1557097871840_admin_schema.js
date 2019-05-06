'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AdminSchema extends Schema {
  up () {
    this.create('admins', (table) => {
      table.increments()
      table.string("name", 120).notNullable()
      table
        .integer('login_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('logins')
        .onUpdate('CASCADE')
        .onDelete('RESTRICT')
        .index()
      table.timestamps()
    })
  }

  down () {
    this.drop('admins')
  }
}

module.exports = AdminSchema
