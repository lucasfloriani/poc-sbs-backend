'use strict'

const Model = use('Model')

class GasStation extends Model {
  static get hidden () {
    return ['login_id']
  }

  bookmarks() {
    return this.hasMany('App/Models/Bookmark')
  }

  city() {
    return this.belongsTo('App/Models/City')
  }

  complaints() {
    return this.hasMany('App/Models/Complaint')
  }

  login() {
    return this.belongsTo('App/Models/Login')
  }

  priceFuels() {
    return this.hasMany('App/Models/PriceFuel')
  }

  priceFuelHistories() {
    return this.hasMany('App/Models/PriceFuelHistory')
  }

  ratings() {
    return this.hasMany('App/Models/Rating')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }
}

module.exports = GasStation
