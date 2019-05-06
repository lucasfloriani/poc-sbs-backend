'use strict'

const Admin = use('App/Models/Admin')
const Database = use('Database')
const Env = use('Env')
const Hash = use('Hash')
const Login = use('App/Models/Login')

class AdminSeeder {
  async run() {
    const trx = await Database.beginTransaction()
    const loginData = {
      email: Env.get('ADMIN_EMAIL'),
      password: Env.get('ADMIN_PASSWORD'),
      profile: 'admin'
    }
    const login = await Login.create(loginData, trx)

    const adminData = { name: Env.get('ADMIN_NAME'), login_id: login.id}
    await Admin.create(adminData, trx)

    await trx.commit()
  }
}

module.exports = AdminSeeder
