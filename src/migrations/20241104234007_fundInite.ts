import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("fundInite", (table) => {
        table.increments("id").primary();
        table.integer("user_id").unsigned();
        table.bigInteger("amount").notNullable().defaultTo(0);
        table.string("reference");
        table
            .datetime("created_at", { useTz: true, precision: 6 })
            .defaultTo(knex.fn.now(6));
        table.datetime("updated_at", { useTz: true, precision: 6 });
        table
			.foreign("user_id")
			.references("id")
			.inTable("users");
    });
}


export async function down(knex: Knex): Promise<void> {
}

