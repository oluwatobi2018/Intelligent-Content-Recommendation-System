const { Knex } = require('knex');

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
exports.up = async function (knex) {
    await knex.schema.createTable('logs', (table) => {
        table.increments('id').primary();
        table.string('level').notNullable();
        table.text('message').notNullable();
        table.json('meta').nullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param {Knex} knex
 * @returns {Promise<void>}
 */
exports.down = async function (knex) {
    await knex.schema.dropTableIfExists('logs');
};