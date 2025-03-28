exports.up = function (knex) {
    return knex.schema.createTable("user_interactions", function (table) {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.uuid("user_id").references("id").inTable("users").onDelete("CASCADE");
      table.uuid("content_id").references("id").inTable("content").onDelete("CASCADE");
      table.enum("interaction_type", ["view", "like", "comment", "share"]);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("user_interactions");
  };

