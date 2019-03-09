"use strict";

const Route = use("Route");

Route.post("/users", "UserController.store");
Route.post("/authenticate", "AuthController.authenticate");

Route.group(() => {
  Route.resource("users", "UserController")
    .apiOnly()
    .except("store");
}).middleware(["auth"]);
