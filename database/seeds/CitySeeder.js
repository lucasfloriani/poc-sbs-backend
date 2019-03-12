'use strict'

const fetch = require('node-fetch')
const City = use('App/Models/City')
const State = use('App/Models/State')

class CitySeeder {
  constructor() {
    this.url = 'http://www.geonames.org/childrenJSON?geonameId='
  }

  async run() {
    const citiesGroupStates = await this.getCitiesGroupByStates()

    for await (const [stateName, cities] of Object.entries(citiesGroupStates)) {
      const correctStateName =
        stateName === 'Federal District' ? 'Distrito Federal' : stateName
      const state = await State.findBy('name', correctStateName)

      for await (const city of cities) {
        const search = { name: city.name, state_id: state.id }
        const infoToCreate = { name: city.name, state_id: state.id }
        await City.findOrCreate(search, infoToCreate)
      }
    }
  }

  async getCitiesGroupByStates() {
    const cities = {}
    const states = await this.getStates()

    for await (const { id, name } of states) {
      const cityResponse = await fetch(`${this.url}${id}`)
      const cidades = await cityResponse.json()
      cities[name] = cidades.geonames.map(city => ({ name: city.toponymName }))
    }

    return cities
  }

  async getStates() {
    const stateUrl = `${this.url}3469034`
    const stateResponse = await fetch(stateUrl)
    const states = await stateResponse.json()

    return states.geonames.map(state => ({
      id: state.geonameId,
      name: state.toponymName
    }))
  }
}

module.exports = CitySeeder
