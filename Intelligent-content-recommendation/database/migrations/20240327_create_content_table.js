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
  