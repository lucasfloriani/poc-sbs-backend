'use strict'

const Model = use('Model')

class State extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  cities() {
    return this.hasMany('App/Models/City')
  }
}

module.exports = State
