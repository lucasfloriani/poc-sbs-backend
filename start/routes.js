'use strict'

// Prefix url from route
const addPrefixToGroup = (group, prefix) => {
  group.prefix(prefix)
  return group
}

const Route = use('Route')
Route.group(() => {
  // Public login routes
  Route.post('users', 'UserController.store').validator('StoreUser')
  Route.post('gas-stations', 'GasStationController.publicStore').validator('PublicStoreGasStation').middleware(['jsonResponse'])
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
  // Password recovery routes
  Route.post('forgot-password', 'AuthController.forgotPassword')
  Route.put('password-recovery', 'AuthController.updatePassword')
}).middleware(['jsonResponse'])

// Private common routes
addPrefixToGroup(
  Route.group(() => {
    Route.get(':id', 'GasStationController.show')
    // Private complaints routes
    Route.get(':id/complaints', 'ComplaintController.gasStationIndex')
  }).middleware(['auth', 'jsonResponse']),
  'gas-stations'
)

// Private admin routes
addPrefixToGroup(
  Route.group(() => {
    // Private admin complaints routes
    Route.get('complaints', 'ComplaintController.index').middleware(['jsonResponse'])
    Route.get('complaints/relatory', 'ComplaintController.relatory')

    // Private admin gasStation routes
    Route.get('gas-stations', 'GasStationController.index').middleware(['jsonResponse'])
    Route.post('gas-stations', 'GasStationController.store').validator('StoreGasStation').middleware(['jsonResponse'])
    Route.put('gas-stations/:id', 'GasStationController.update').validator('UpdateGasStation').middleware(['jsonResponse'])
    Route.get('gas-stations/relatory', 'GasStationController.relatory')

    // Private admin price fuel history
    Route.get('price-fuel-history/relatory', 'PriceFuelController.relatory')
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
    Route.post('complaints', 'ComplaintController.store') //.validator('StoreComplaint')

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
  }).middleware(['auth', 'onlyUser', 'jsonResponse']),
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
  }).middleware(['auth', 'onlyGasStation', 'jsonResponse']),
  'gas-stations'
)
