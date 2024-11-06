import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable("wallets", (table) => {
		table.increments("id").primary();
		table.integer("user_id").unsigned();
		table.bigInteger("amount").notNullable().defaultTo(0);
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
		table
			.foreign("user_id")
			.references("id")
			.inTable("users")
			.onDelete("CASCADE");
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("wallets");
}

