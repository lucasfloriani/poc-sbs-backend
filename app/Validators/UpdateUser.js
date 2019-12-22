'use strict'

const { formatters } = use('Validator')

class UpdateUser {
  get rules() {
    const userID = this.ctx.params.id

    return {
      cpf:
        `required|string|regex:^([0-9]{3}.){2}[0-9]{3}-[0-9]{2}$|cpf|unique:users,cpf,id,${userID}`,
      name: 'required|string'
    }
  }

  get messages() {
    return {
      'cpf.required': 'CPF é obrigatório.',
      'cpf.string': 'CPF precisa ser um texto.',
      'cpf.regex': 'CPF em formato inválido.',
      'cpf.cpf': 'CPF é inválido.',
      'cpf.unique': 'CPF de usuário já cadastrado.',
      'name.required': 'Nome é obrigatório.',
      'name.string': 'Nome precisa ser um texto.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = UpdateUser
