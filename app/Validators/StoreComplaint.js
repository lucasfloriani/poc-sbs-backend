'use strict'

const { formatters } = use('Validator')

class StoreComplaint {
  get rules() {
    return {
      gas_station_id: 'required|integer',
      message: 'required|string',
      image: 'file|file_ext:png,jpg,jpeg|file_size:5mb|file_types:image'
    }
  }

  get messages() {
    return {
      'gas_station_id.required': 'Posto de Gasolina é obrigatório.',
      'gas_station_id.integer': 'Identificador do posto de gasolina é inválido.',
      'message.required': 'Mensagem é obrigatória.',
      'message.string': 'Mensagem precisa ser um texto.',
      'image.file': 'Formato da imagem incorreto',
      'image.file_ext': 'Extensão da imagem é inválido',
      'image.file_size': 'Tamanho da imagem acima do permitido (5 mb)',
      'image.file_types': 'Arquivo precisa ser uma imagem',
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = StoreComplaint
