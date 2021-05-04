// Update with your config settings.

export default {
    development: {
        client: "sqlite3",
        useNullAsDefault: true,
        connection: {
            filename: "dev.sqlite3",
        },
    },

    staging: {
        client: "postgresql",
        connection: {
            database: "w_staging",
            user: "postgres",
            password: "*******************",
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },

    production: {
        client: "postgresql",
        connection: {
            database: "w_production",
            user: "postgres",
            password: "*******************",
        },
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tableName: "knex_migrations",
        },
    },
};
