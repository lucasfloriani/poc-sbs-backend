'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ComplaintSchema extends Schema {
  up () {
    this.table('complaints', (table) => {
      table.string('image')
    })
  }

  down () {
    this.table('complaints', (table) => {
      table.dropColumn('image')
    })
  }
}

module.exports = ComplaintSchema
