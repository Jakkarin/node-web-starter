import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable('users', function (table) {
        table.bigIncrements('id')
            .unsigned();
        table.string('username')
            .unique();
        table.string('display_name');
        table.string('email')
            .unique();
        table.string('password');
        table.boolean('email_verified').defaultTo(false);
        table.timestamps();
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists('users');
}