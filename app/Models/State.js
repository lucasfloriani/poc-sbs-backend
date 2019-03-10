'use strict'

const Model = use('Model')

class State extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
  }
}

module.exports = State
