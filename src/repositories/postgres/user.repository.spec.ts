import Knex, { Knex as _Knex } from "knex";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import User from "@/models/user.model";
import PostgresUserRepository from "./user.repository";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bangkok");

describe('PostgresUserRepository', () => {
    let knex: _Knex;
    let repo: PostgresUserRepository;

    beforeAll(async () => {
        knex = Knex({
            client: 'sqlite3',
            useNullAsDefault: true,
            connection: {
                filename: ":memory:"
            }
        });

        await knex.migrate.latest();
        await knex.seed.run();

        repo = new PostgresUserRepository({ knex });
    });

    afterAll(async () => {
        await knex.destroy();
    });

    it('get', async () => {
        // await knex<User>('users').insert({
        //     email: 'admin@admin.com',
        //     created_at: dayjs().tz().format(),
        //     updated_at: dayjs().tz().format(),
        // });

        let user = await repo.get('1');

        expect(user.email).toBe('admin@admin.com');
    });

    it('listing', async () => {
        let result = await repo.list({
            where: [
                {
                    id: '1',
                    email: {
                        contains: 'admin',
                    },
                },
            ],
            order: {
                id: true,
            },
            limit: 15,
            offset: 0,
        }, ['email']);

        expect(result.data).toHaveLength(1);
        expect(result.total).toEqual(1);
        expect(result.data[0].email).toEqual('admin@admin.com');
        expect(result.data[0].created_at).toBeUndefined();
        expect(result.data[0].updated_at).toBeUndefined();
    });
});