'use strict'

const Route = use('Route')

Route.post('/authenticate', 'AuthController.authenticate')

Route.post('/users', 'UserController.store')
Route.post('/gas-stations', 'GasStationController.store')
Route.resource('cities', 'CityController').only(['index', 'show'])
Route.resource('states', 'StateController').only(['index', 'show'])
Route.resource('fuel-types', 'FuelTypeController').only(['index', 'show'])
Route.resource('payment-types', 'PaymentTypeController').only(['index', 'show'])

Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except('store')
}).middleware(['auth', 'onlyUser'])

Route.group(() => {
  Route.resource('gas-stations', 'GasStationController')
    .apiOnly()
    .except('store')
}).middleware(['auth', 'onlyGasStation'])
