'use strict'

const addPrefixToGroup = (group, prefix) => {
  group.prefix(prefix)
  return group
}

const Route = use('Route')
Route.post('users', 'UserController.store').validator('StoreUser')

Route.post('authenticate', 'AuthController.authenticate').validator('Auth')
Route.get('states', 'StateController.index')
Route.get('states/:stateID/cities', 'CityController.index')
Route.resource('fuel-types', 'FuelTypeController').only(['index', 'show'])
Route.resource('payment-types', 'PaymentTypeController').only(['index', 'show'])

addPrefixToGroup(
  Route.group(() => {
    Route.get('', 'GasStationController.index')
    Route.get(':id', 'GasStationController.show')
    Route.get(':id/complaints', 'ComplaintController.gasStationIndex')
  }).middleware(['auth']),
  'gas-stations'
)

addPrefixToGroup(
  Route.group(() => {
    Route.post('', 'GasStationController.store').validator('StoreGasStation')
    Route.put(':id', 'GasStationController.update').validator('UpdateGasStation')
  }).middleware(['auth', 'onlyAdmin']),
  'gas-stations'
)


addPrefixToGroup(
  Route.group(() => {
    Route.resource('', 'UserController')
      .apiOnly()
      .except('store')
      .validator(new Map([[['users.update'], ['UpdateUser']]]))

    Route.get('complaints', 'ComplaintController.userIndex')
    Route.resource('complaints', 'ComplaintController')
      .apiOnly()
      .except('index')
      .validator(
        new Map([
          [['complaints.store'], ['StoreComplaint']],
          [['complaints.update'], ['UpdateComplaint']]
        ])
      )
    Route.resource('bookmarks', 'BookmarkController')
      .only(['index', 'store', 'destroy'])
      .validator(new Map([[['bookmarks.store'], ['StoreBookmark']]]))

    Route.resource('ratings', 'RatingController')
      .apiOnly()
      .except('index')
      .validator(
        new Map([
          [['ratings.store'], ['StoreRating']],
          [['ratings.update'], ['UpdateRating']]
        ])
      )
  }).middleware(['auth', 'onlyUser']),
  'users'
)

addPrefixToGroup(
  Route.group(() => {
    Route.resource('price-fuel', 'PriceFuelController')
      .apiOnly()
      .validator(
        new Map([
          [['price-fuel.store'], ['StorePriceFuel']],
          [['price-fuel.update'], ['UpdatePriceFuel']]
        ])
      )
  }).middleware(['auth', 'onlyGasStation']),
  'gas-stations'
)
