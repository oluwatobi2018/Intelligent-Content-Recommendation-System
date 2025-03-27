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
// - name: The name of the user, which cannot be null.
// - email: The email address of the user, which must be unique and cannot be null.
// - password: The hashed password of the user, which cannot be null.
// - created_at: A timestamp indicating when the user was created.
// - updated_at: A timestamp indicating when the user was last updated.
// This table is essential for managing user accounts and authentication in the application.
// The `up` function defines the schema for creating the table, while the `down` function defines how to drop it.
// The `timestamps` method automatically adds `created_at` and `updated_at` columns to the table, which are managed by Knex.js.
// The `defaultTo(knex.raw("gen_random_uuid()"))` method generates a random UUID for the `id` column by default.
// This is useful for creating unique identifiers for each user without needing to manually generate them.
// The `unique` method ensures that the `email` column cannot have duplicate values, enforcing data integrity.
// The `notNullable` method ensures that the specified columns cannot be null, enforcing data integrity.
