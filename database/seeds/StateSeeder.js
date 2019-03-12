'use strict'

const State = use('App/Models/State')

class StateSeeder {
  async run() {
    const states = [
      { name: 'Acre', abbreviation: 'AC' },
      { name: 'Alagoas', abbreviation: 'AL' },
      { name: 'Amapá', abbreviation: 'AP' },
      { name: 'Amazonas', abbreviation: 'AM' },
      { name: 'Bahia', abbreviation: 'BA' },
      { name: 'Ceará', abbreviation: 'CE' },
      { name: 'Distrito Federal', abbreviation: 'DF' },
      { name: 'Espírito Santo', abbreviation: 'ES' },
      { name: 'Goiás', abbreviation: 'GO' },
      { name: 'Maranhão', abbreviation: 'MA' },
      { name: 'Mato Grosso', abbreviation: 'MT' },
      { name: 'Mato Grosso do Sul', abbreviation: 'MS' },
      { name: 'Minas Gerais', abbreviation: 'MG' },
      { name: 'Pará', abbreviation: 'PA' },
      { name: 'Paraíba', abbreviation: 'PB' },
      { name: 'Paraná', abbreviation: 'PR' },
      { name: 'Pernambuco', abbreviation: 'PE' },
      { name: 'Piauí', abbreviation: 'PI' },
      { name: 'Rio de Janeiro', abbreviation: 'RJ' },
      { name: 'Rio Grande do Norte', abbreviation: 'RN' },
      { name: 'Rio Grande do Sul', abbreviation: 'RS' },
      { name: 'Rondônia', abbreviation: 'RO' },
      { name: 'Roraima', abbreviation: 'RR' },
      { name: 'Santa Catarina', abbreviation: 'SC' },
      { name: 'São Paulo', abbreviation: 'SP' },
      { name: 'Sergipe', abbreviation: 'SE' },
      { name: 'Tocantins', abbreviation: 'TO' }
    ]

    for await (const state of states) {
      await State.findOrCreate({ name: state.name }, state)
    }
  }
}

module.exports = StateSeeder
