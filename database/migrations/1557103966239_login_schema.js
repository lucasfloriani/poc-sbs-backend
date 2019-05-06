'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class LoginSchema extends Schema {
  up () {
    this.raw(`
      ALTER TABLE "logins"
      DROP CONSTRAINT "logins_profile_check",
      ADD CONSTRAINT "logins_profile_check"
      CHECK (profile IN ('admin', 'gas-station', 'user'))
    `)
  }

  down () {
    this.raw(`
      ALTER TABLE "logins"
      DROP CONSTRAINT "logins_profile_check",
      ADD CONSTRAINT "logins_profile_check"
      CHECK (profile IN ('gas-station', 'user'))
    `)
  }
}

module.exports = LoginSchema
