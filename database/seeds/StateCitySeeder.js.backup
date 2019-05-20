'use strict'

const fetch = require('node-fetch')
const City = use('App/Models/City')
const State = use('App/Models/State')

class StateCitySeeder {
  getStateURL() {
    return 'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
  }

  getCityURL(stateID) {
    return `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateID}/municipios`
  }

  async getStates() {
    const stateResponse = await fetch(this.getStateURL())
    const states = await stateResponse.json()
    return states
  }

  async getCities(stateID) {
    const cityResponse = await fetch(this.getCityURL(stateID))
    const cities = await cityResponse.json()
    return cities
  }

  async run() {
    const states = await this.getStates()

    for await (const state of states) {
      const savedState = await State.findOrCreate(
        { name: state.nome },
        { name: state.nome, abbreviation: state.sigla },
      )

      const cities = await this.getCities(state.id)
      for await (const city of cities) {
        await City.findOrCreate(
          { name: city.nome, state_id: savedState.id },
          { name: city.nome, state_id: savedState.id },
        )
      }
    }
  }
}

module.exports = StateCitySeeder
