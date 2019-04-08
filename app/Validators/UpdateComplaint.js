'use strict'

const { formatters } = use('Validator')

class UpdateComplaint {
  get rules() {
    return {
      message: 'required|string'
    }
  }

  get messages() {
    return {
      'message.required': 'Mensagem é obrigatória.',
      'message.string': 'Mensagem precisa ser um texto.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = UpdateComplaint
