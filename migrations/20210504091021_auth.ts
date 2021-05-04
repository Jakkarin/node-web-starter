import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('auth', function (table) {
        table.string('id').primary();
        table.bigInteger('user_id')
            .unsigned()
            .references('id')
            .inTable('users')
            .onDelete('CASCADE');
        table.string('access_id');
        table.string('refresh_id');
        table.timestamps();
    });

    await knex.schema.createTable('auth_logs', function (table) {
        table.bigInteger('user_id').unsigned();
        table.string('ip_address');
        table.string('user_agent');
        table.timestamp('created_at');
        table.primary(['user_id', 'created_at']);
    });
}


export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('auth');
    await knex.schema.dropTableIfExists('auth_logs');
}

