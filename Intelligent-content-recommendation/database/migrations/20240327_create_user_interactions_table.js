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

  // This migration creates a "user_interactions" table with the following columns:
// - id: A unique identifier for each interaction, generated as a UUID.
// - user_id: A foreign key referencing the users table, indicating which user made the interaction.
// - content_id: A foreign key referencing the content table, indicating which content was interacted with.
// - interaction_type: An enum indicating the type of interaction (view, like, comment, share).
// - created_at: A timestamp indicating when the interaction was created.
// - updated_at: A timestamp indicating when the interaction was last updated.

  