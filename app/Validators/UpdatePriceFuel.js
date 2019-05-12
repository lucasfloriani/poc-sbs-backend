'use strict'

const { formatters } = use('Validator')

class UpdatePriceFuel {
  get rules() {
    return {
      payment_type_id: 'required|integer',
      fuel_type_id: 'required|integer',
      price: 'required|number|range:0.000,99.999'
    }
  }

  get messages() {
    return {
      'payment_type_id.required': 'Tipo de pagamento é obrigatório.',
      'payment_type_id.string': 'Tipo de pagamento inválido.',
      'fuel_type_id.required': 'Tipo de combustível é obrigatório.',
      'fuel_type_id.string': 'Tipo de combustível inválido.',
      'price.required': 'Preço é obrigatório.',
      'price.number': 'Preço precisa ser um número.',
      'price.range': 'Preço precisa ser entre 0,000 até 99,999.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = UpdatePriceFuel
