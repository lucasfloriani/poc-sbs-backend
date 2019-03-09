"use strict";

const Schema = use("Schema");

class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      table.increments();
      table
        .string("cpf", 14)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.string("name", 120).notNullable();
      table
        .string("email", 150)
        .notNullable()
        .unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
