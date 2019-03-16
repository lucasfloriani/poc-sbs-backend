'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Complaint extends Model {
  gasStation() {
    return this.belongsTo('App/Models/GasStation')
  }

  ratings() {
    return this.hasMany('App/Models/Rating')
  }

  user() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Complaint
