import { Knex } from "knex";
import dayjs from "dayjs";

import IUser from "@/models/user.model";

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries
    await knex("users").del();

    // Inserts seed entries
    await knex<IUser>("users").insert([
        {
            id: '1',
            email: "admin@admin.com",
            display_name: 'admin',
            username: 'admin',
            created_at: dayjs().format(),
            updated_at: dayjs().format(),
        },
    ]);
};
