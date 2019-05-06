'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Admin extends Model {
  login() {
    return this.belongsTo('App/Models/Login')
  }
}

module.exports = Admin
