'use strict'

const FuelType = use('App/Models/FuelType')

class FuelTypeSeeder {
  async run() {
    const fuelTypes = [
      { name: 'Gasolina Comum' },
      { name: 'Gasolina Aditivada' },
      { name: 'Etanol' },
      { name: 'Diesel S10' },
      { name: 'Diesel S500' }
    ]

    for await (const fuelType of fuelTypes) {
      await FuelType.findOrCreate({ name: fuelType.name }, fuelType)
    }
  }
}

module.exports = FuelTypeSeeder
