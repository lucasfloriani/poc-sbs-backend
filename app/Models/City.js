'use strict'

const Model = use('Model')

class City extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  state() {
    return this.belongsTo('App/Models/State')
  }
}

module.exports = City
