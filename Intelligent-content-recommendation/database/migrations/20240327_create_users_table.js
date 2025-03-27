exports.up = function (knex) {
    return knex.schema.createTable("users", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("name").notNullable();
      table.string("email").unique().notNullable();
      table.string("password").notNullable();
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("users");
  };
  
// This migration creates a "users" table with the following columns:
// - id: A unique identifier for each user, generated as a UUID.