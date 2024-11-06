import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("profile", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned();
        table.text("bio").nullable;
        table.text("avatar").nullable;
        table
            .datetime("created_at", { useTz: true, precision: 6 })
            .defaultTo(knex.fn.now(6));
        table.datetime("updated_at", { useTz: true, precision: 6 });
        table
			.foreign("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTableIfExists("profile");
}

