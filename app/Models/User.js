'use strict'

const Model = use('Model')

class User extends Model {
  complaints() {
    return this.hasMany('App/Models/Complaint')
  }

  login() {
    return this.belongsTo('App/Models/Login')
  }
}

module.exports = User
