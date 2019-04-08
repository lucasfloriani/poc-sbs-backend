'use strict'

const { formatters } = use('Validator')

class UpdatePriceFuel {
  get rules() {
    return {
      payment_type_id: 'required|integer',
      fuel_type_id: 'required|integer',
      price: 'required|number'
    }
  }

  get messages() {
    return {
      'payment_type_id.required': 'Tipo de pagamento é obrigatório.',
      'payment_type_id.string': 'Tipo de pagamento inválido.',
      'fuel_type_id.required': 'Tipo de combustível é obrigatório.',
      'fuel_type_id.string': 'Tipo de combustível inválido.',
      'price.required': 'Preço é obrigatório.',
      'price.string': 'Preço precisa ser um número.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = UpdatePriceFuel
