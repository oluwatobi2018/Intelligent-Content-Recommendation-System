exports.up = function (knex) {
    return knex.schema.createTable("content", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("title").notNullable();
      table.enum("type", ["text", "image", "link"]).notNullable();
      table.text("content").notNullable();
      table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("content");
  };

  // This migration creates a "content" table with the following columns:
// - id: A unique identifier for each content item, generated as a UUID.
// - title: The title of the content item, which cannot be null.
// - type: The type of content (text, image, link), which cannot be null.
// - content: The actual content of the item, which cannot be null.
// - user_id: A foreign key referencing the users table, indicating which user created the content item.


  