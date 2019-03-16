'use strict'

const Model = use('Model')

class GasStation extends Model {
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

  ratings() {
    return this.hasMany('App/Models/Rating')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }
}

module.exports = GasStation
