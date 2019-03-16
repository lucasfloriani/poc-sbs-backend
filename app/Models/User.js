'use strict'

const Model = use('Model')

class User extends Model {
  login() {
    return this.belongsTo('App/Models/Login')
  }
}

module.exports = User
