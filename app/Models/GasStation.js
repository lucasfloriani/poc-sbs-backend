'use strict'

const Model = use('Model')

class GasStation extends Model {
  city() {
    return this.belongsTo('App/Models/City')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }

  login() {
    return this.belongsTo('App/Models/Login')
  }
}

module.exports = GasStation
