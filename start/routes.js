'use strict'

const Route = use('Route')

Route.post('/users', 'UserController.store')
Route.post('/authenticate', 'AuthController.authenticate')

Route.group(() => {
  Route.resource('users', 'UserController')
    .apiOnly()
    .except('store')

  Route.resource('states', 'StateController').only(['index', 'show'])
}).middleware(['auth'])
