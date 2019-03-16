'use strict'

const Schema = use('Schema')

class BookmarkSchema extends Schema {
  up() {
    this.create('bookmarks', table => {
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
      table.timestamps()
    })
  }

  down() {
    this.drop('bookmarks')
  }
}

module.exports = BookmarkSchema
