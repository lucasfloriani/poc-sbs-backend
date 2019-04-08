'use strict'

const { formatters } = use('Validator')

class StoreComplaint {
  get rules() {
    return {
      gas_station_id: 'required|integer',
      message: 'required|string'
    }
  }

  get messages() {
    return {
      'gas_station_id.required': 'Posto de Gasolina é obrigatório.',
      'gas_station_id.integer':
        'Identificador do posto de gasolina é inválido.',
      'message.required': 'Mensagem é obrigatória.',
      'message.string': 'Mensagem precisa ser um texto.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = StoreComplaint
