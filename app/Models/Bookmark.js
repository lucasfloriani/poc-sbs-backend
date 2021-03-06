'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Bookmark extends Model {
  gasStation() {
    return this.belongsTo('App/Models/GasStation')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Bookmark
