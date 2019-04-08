'use strict'

const { formatters } = use('Validator')

class StoreUser {
  get rules() {
    return {
      cpf:
        'required|string|regex:^([0-9]{3}.){2}[0-9]{3}-[0-9]{2}$|unique:users,cpf',
      email: 'required|string|email|unique:logins,email',
      name: 'required|string',
      password: 'required|string|min:6'
    }
  }

  get messages() {
    return {
      'cpf.required': 'CPF é obrigatório.',
      'cpf.string': 'CPF precisa ser um texto.',
      'cpf.regex': 'CPF em formato inválido.',
      'cpf.unique': 'CPF já cadastrado.',
      'email.required': 'E-mail é obrigatório.',
      'email.string': 'E-mail precisa ser um texto.',
      'email.email': 'E-mail inválido.',
      'email.unique': 'E-mail de usuário já cadastrado.',
      'name.required': 'Nome é obrigatório.',
      'name.string': 'Nome precisa ser um texto.',
      'password.required': 'Senha é obrigatória',
      'password.string': 'Senha precisa ser um texto',
      'password.min': 'Senha precisa ser no mínimo de 6 caracteres'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = StoreUser
