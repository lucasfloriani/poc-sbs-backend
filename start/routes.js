'use strict'

const Route = use('Route')
const addPrefixToGroup = (group, prefix) => {
  group.prefix(prefix)
  return group
}

Route.post('users', 'UserController.store')
Route.post('gas-stations', 'GasStationController.store')
Route.post('authenticate', 'AuthController.authenticate')
Route.resource('cities', 'CityController').only(['index', 'show'])
Route.resource('states', 'StateController').only(['index', 'show'])
Route.resource('fuel-types', 'FuelTypeController').only(['index', 'show'])
Route.resource('payment-types', 'PaymentTypeController').only(['index', 'show'])

Route.group(() => {
  Route.get(
    'gas-stations/:id/complaints',
    'ComplaintController.gasStationIndex'
  )
}).middleware(['auth'])

addPrefixToGroup(
  Route.group(() => {
    Route.resource('', 'UserController')
      .apiOnly()
      .except('store')

    Route.get('complaints', 'ComplaintController.userIndex')
    Route.resource('complaints', 'ComplaintController')
      .apiOnly()
      .except('index')
  }).middleware(['auth', 'onlyUser']),
  'users'
)

addPrefixToGroup(
  Route.group(() => {
    Route.resource('', 'GasStationController')
      .apiOnly()
      .except('store')
  }).middleware(['auth', 'onlyGasStation']),
  'gas-stations'
)
