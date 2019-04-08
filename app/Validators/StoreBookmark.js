'use strict'

const { formatters } = use('Validator')

class Bookmark {
  get rules() {
    return {
      gas_station_id: 'required|integer'
    }
  }

  get messages() {
    return {
      'cpf.required': 'Posto de gasolina é obrigatório.',
      'cpf.integer': 'Posto de gasolina precisa ser um identificador válido.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = Bookmark
