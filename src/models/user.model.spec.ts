import Knex from "knex";

describe('Knex', () => {
    it('sqlite', async () => {
        let sqlite3 = Knex({
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: ":memory:"
            }
        });

        await sqlite3.migrate.latest();

        expect(await sqlite3.schema.hasTable('users'))
            .toBeTruthy();

        await sqlite3.destroy();
    });

    it('postgres', async () => {
        let knex = Knex({
            client: 'postgresql',
            connection: {
                host: '127.0.0.1',
                port: 5432,
                user: 'postgres',
                password: 'tHa1pe41greE-357.46',
                database: 'test'
            }
        });

        await knex.migrate.down();
        await knex.migrate.latest();

        expect(await knex.schema.hasTable('users'))
            .toBeTruthy();

        await knex.destroy();
    });
});
