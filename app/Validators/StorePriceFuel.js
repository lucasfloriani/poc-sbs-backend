'use strict'

const { formatters } = use('Validator')

class StorePriceFuel {
  get rules() {
    return {
      gas_station_id: 'required|integer',
      payment_type_id: 'required|integer',
      fuel_type_id: 'required|integer',
      price: 'required|number'
    }
  }

  get messages() {
    return {
      'gas_station_id.required': 'Posto de gasolina é obrigatório.',
      'gas_station_id.integer': 'Posto de gasolina inválido.',
      'payment_type_id.required': 'Tipo de pagamento é obrigatório.',
      'payment_type_id.integer': 'Tipo de pagamento inválido.',
      'fuel_type_id.required': 'Tipo de combustível é obrigatório.',
      'fuel_type_id.integer': 'Tipo de combustível inválido.',
      'price.required': 'Preço é obrigatório.',
      'price.number': 'Preço precisa ser um número.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = StorePriceFuel
