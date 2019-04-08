'use strict'

const { formatters } = use('Validator')

class Auth {
  get rules() {
    return {
      email: 'required|email',
      password: 'required'
    }
  }

  get messages() {
    return {
      'email.required': 'Você precisa informar seu e-mail de usuário.',
      'email.email': 'E-mail invalido.',
      'password.required': 'Você precisa informar sua senha.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = Auth
