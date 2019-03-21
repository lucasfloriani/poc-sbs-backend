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

  paymentTypes() {
    return this.belongsToMany('App/Models/PaymentType').pivotModel(
      use('App/Models/GasStationPaymentType')
    )
  }

  ratings() {
    return this.hasMany('App/Models/Rating')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }
}

module.exports = GasStation
