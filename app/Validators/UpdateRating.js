'use strict'

const { formatters } = use('Validator')

class UpdateRating {
  get rules() {
    return {
      rating: 'required|number|max:5|min:1'
    }
  }

  get messages() {
    return {
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

module.exports = UpdateRating
