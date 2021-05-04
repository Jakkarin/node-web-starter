import { Knex } from "knex";

import User from "@/models/user.model";
import IUserRepository from "@/domians/user.repository";
import Listing, { ListingResult } from "@/utils/listing";

interface config {
    knex: Knex<User>;
}

export default class PostgresUserRepository implements IUserRepository {
    _config: config;
    _tableName = 'users';

    constructor(config: config) {
        this._config = config;
    }

    async get(id: string, only: string[] = []): Promise<User> {
        return await this._config.knex
            .table(this._tableName)
            .select(only)
            .where('id', id)
            .limit(1)
            .first<User>();
    }

    async getByEmail(email: string, only: string[]): Promise<User> {
        return await this._config.knex
            .table(this._tableName)
            .select(only)
            .where('email', email)
            .limit(1)
            .first<User>();
    }

    async list(opts: Listing, only: string[] = []): Promise<ListingResult<User[]>> {
        let query = this._config.knex
            .table(this._tableName)
            .select(only);

        if (!opts?.offset) {
            opts.offset = 0;
        }

        if (!opts?.limit) {
            opts.limit = 10;
        }

        if (opts?.where) {
            for (let x of opts.where) {
                query.orWhere((builder) => {
                    for (let [k, v] of Object.entries(x)) {
                        if (v?.contains) {
                            builder.where(k, 'like', `%${v.contains}%`);
                        } else if (v?.in) {
                            builder.whereIn(k, v.in);
                        } else if (v?.notIn) {
                            builder.whereNotIn(k, v.notIn);
                        } else if (v?.notEqual) {
                            builder.whereNot(k, v.notEqual);
                        } else {
                            builder.where(k, v);
                        }
                    }
                });
            }
        }

        if (opts?.order) {
            for (let [k, v] of Object.entries(opts.order)) {
                query.orderBy(k, v ? 'desc' : 'asc');
            }
        }

        let count = await query.clone().count('id', { as: 'id' });
        let result = await query.limit(opts.limit).offset(opts.offset);

        return {
            data: result,
            total: parseInt(count[0].id.toString()),
        };
    }

    async create(user: User, only: string[]): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async update(user: User, only: string[]): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}