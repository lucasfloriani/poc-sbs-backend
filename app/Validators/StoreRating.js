'use strict'

const { formatters } = use('Validator')

class StoreRating {
  get rules() {
    return {
      gas_station_id: 'required|integer',
      rating: 'required|number|max:5|min:1'
    }
  }

  get messages() {
    return {
      'gas_station_id.required': 'Posto de gasolina é obrigatório.',
      'gas_station_id.integer': 'Posto de gasolina inválido.',
      'rating.required': 'Rating é obrigatório.',
      'rating.string': 'Rating precisa ser um número.',
      'rating.max': 'Rating precisa ser no mínimo 1.',
      'rating.min': 'Rating precisa ser no máximo 5.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = StoreRating
