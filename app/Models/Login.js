'use strict'

const Model = use('Model')
const Hash = use('Hash')

class Login extends Model {
  static boot() {
    super.boot()
    this.addTrait('NoTimestamp')
    this.addHook('beforeSave', async loginInstance => {
      if (loginInstance.dirty.password) {
        loginInstance.password = await Hash.make(loginInstance.password)
      }
    })
  }
}

module.exports = Login
