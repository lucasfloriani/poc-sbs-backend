'use strict'

const { formatters } = use('Validator')

class UpdateGasStation {
  get rules() {
    return {
      cnpj:
        'required|string|regex:^[0-9]{2}.?[0-9]{3}.?[0-9]{3}/?[0-9]{4}-?[0-9]{2}$|unique:gas_stations,cnpj',
      business_name: 'required|string',
      fantasy_name: 'required|string',
      state_registration: 'required|string',
      anp: 'required|string',
      cep: 'required|string|regex:^[0-9]{5}-[0-9]{3}$',
      address: 'required|string',
      complement: 'required|string',
      neighborhood: 'required|string',
      geo_location:
        'required|string|regex:^[-+]?([1-8]?d(.d+)?|90(.0+)?),s*[-+]?(180(.0+)?|((1[0-7]d)|([1-9]?d))(.d+)?)$',
      city_id: 'required|integer',
      state_id: 'required|integer'
    }
  }

  get messages() {
    return {
      'cnpj.required': 'CNPJ é obrigatório.',
      'cnpj.string': 'CNPJ precisa ser um texto.',
      'cnpj.regex': 'CNPJ em formato inválido.',
      'cnpj.unique': 'CNPJ já cadastrado.',
      'business_name.required': 'Nome da empresa é obrigatório.',
      'business_name.string': 'Nome da empresa precisa ser um texto.',
      'fantasy_name.required': 'Nome fantasia é obrigatório.',
      'fantasy_name.string': 'Nome fantasia precisa ser um texto.',
      'state_registration.required': 'Inscrição estadual é obrigatório.',
      'state_registration.string': 'Inscrição estadual precisa ser um texto.',
      'anp.required': 'ANP é obrigatório.',
      'anp.string': 'ANP precisa ser um texto.',
      'cep.required': 'CEP é obrigatório.',
      'cep.string': 'CEP precisa ser um texto.',
      'cep.regex': 'CEP inválido',
      'address.required': 'Endereço é obrigatório.',
      'address.string': 'Endereço precisa ser um texto.',
      'complement.required': 'Complemento é obrigatório.',
      'complement.string': 'Complemento precisa ser um texto.',
      'neighborhood.required': 'Bairro é obrigatório.',
      'neighborhood.string': 'Bairro precisa ser um texto.',
      'geo_location.required': 'Localização é obrigatório.',
      'geo_location.string': 'Localização precisa ser um texto.',
      'geo_location.regex': 'Localização inválida.',
      'city_id.required': 'Cidade é obrigatória.',
      'city_id.integer': 'Cidade inválida.',
      'state_id.required': 'Estado é obrigatório.',
      'state_id.integer': 'Estado inválido.'
    }
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = UpdateGasStation
