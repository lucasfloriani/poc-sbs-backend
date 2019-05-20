'use strict'

const states = require('./estados.json');
const cities = require('./cidades.json');
const City = use('App/Models/City')
const State = use('App/Models/State')

class StateCitySeeder {
  async run() {
    for await (const state of states) {
      const savedState = await State.create({
        name: state.Nome,
        abbreviation: state.Sigla
      })

      for await (const city of cities) {
        if (city.Estado !== savedState.id.toString()) continue

        await City.create({
          name: city.Nome,
          state_id: savedState.id
        })
      }
    }
  }
}

module.exports = StateCitySeeder
