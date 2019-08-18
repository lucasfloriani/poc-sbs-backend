'use strict'

// Prefix url from route
const addPrefixToGroup = (group, prefix) => {
  group.prefix(prefix)
  return group
}

const Route = use('Route')
// Public login routes
Route.post('users', 'UserController.store').validator('StoreUser')
Route.post('authenticate', 'AuthController.authenticate').validator('Auth')
// Public state routes
Route.get('states', 'StateController.index')
Route.get('states/:stateID/cities', 'CityController.index')
// Public fuelTypes routes
Route.get('fuel-types', 'FuelTypeController.index')
Route.get('fuel-types/:id', 'FuelTypeController.show')
// Public paymentTypes routes
Route.get('payment-types', 'PaymentTypeController.index')
Route.get('payment-types/:id', 'PaymentTypeController.show')
// Public gasStation routes
Route.get('gas-stations', 'GasStationController.index')

// Private common routes
addPrefixToGroup(
  Route.group(() => {
    Route.get(':id', 'GasStationController.show')
    // Private complaints routes
    Route.get(':id/complaints', 'ComplaintController.gasStationIndex')
  }).middleware(['auth']),
  'gas-stations'
)

// Private admin routes
addPrefixToGroup(
  Route.group(() => {
    // Private admin complaints routes
    Route.get('complaints', 'ComplaintController.index')

    // Private admin gasStation routes
    Route.post('gas-stations', 'GasStationController.store').validator('StoreGasStation')
    Route.put('gas-stations/:id', 'GasStationController.update').validator('UpdateGasStation')
  }).middleware(['auth', 'onlyAdmin']),
  'admin'
)

// Private user routes
addPrefixToGroup(
  Route.group(() => {
    // User private user routes
    Route.get('', 'UserController.index')
    Route.get(':id', 'UserController.show')
    Route.put(':id', 'UserController.update').validator('UpdateUser')
    Route.delete(':id', 'UserController.destroy')

    // Private user complaints routes
    Route.get('complaints/:id', 'ComplaintController.show')
    Route.get('gas-stations/complaint', 'GasStationController.indexComplaint')
    Route.post('complaints', 'ComplaintController.store').validator('StoreComplaint')

    // Private user bookmarks routes
    Route.get('bookmarks', 'BookmarkController.index')
    Route.get('gas-stations/bookmark', 'GasStationController.indexBookmark')
    Route.post('bookmarks', 'BookmarkController.store').validator('StoreBookmark')
    Route.delete('bookmarks/:id', 'BookmarkController.destroy')

    // Private user ratings routes
    Route.get('ratings/:id', 'RatingController.show')
    Route.get('gas-stations/rating', 'GasStationController.indexRating')
    Route.post('ratings', 'RatingController.store').validator('StoreRating')
    Route.put('ratings/:id', 'RatingController.update').validator('UpdateRating')
    Route.delete('ratings/:id', 'RatingController.destroy')
  }).middleware(['auth', 'onlyUser']),
  'users'
)

addPrefixToGroup(
  Route.group(() => {
    // Private gasStation priceFuels routes
    Route.get(':gasStation/price-fuels', 'PriceFuelController.index')
    Route.get('price-fuel/:id', 'PriceFuelController.show')
    Route.post('price-fuel', 'PriceFuelController.store').validator('StorePriceFuel')
    Route.put('price-fuel/:id', 'PriceFuelController.update').validator('UpdatePriceFuel')
    Route.delete('price-fuel/:id', 'PriceFuelController.destroy')
  }).middleware(['auth', 'onlyGasStation']),
  'gas-stations'
)
