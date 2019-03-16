'use strict'

const Model = use('Model')

class GasStation extends Model {
  city() {
    return this.belongsTo('App/Models/City')
  }

  complaints() {
    return this.hasMany('App/Models/Complaint')
  }

  login() {
    return this.belongsTo('App/Models/Login')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }
}

module.exports = GasStation
