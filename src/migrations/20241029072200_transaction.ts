import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
	return knex.schema.createTable("transactions", (table) => {
		table.increments("id").primary();
		table.integer("user_id").unsigned();
		table.integer("peer_user_id").unsigned();
		table.bigInteger("amount").notNullable();
		table.string("description");
		table.string("reference");
		table.boolean("outward").defaultTo(false);
		table.enu("status", [
			"pending",
			"declined",
			"canceled",
			"successful"
		]).defaultTo("Pending");
		table.enu("type", [
			"funding",
			"p2p",
			"bills",
			"disburse",
			"withdrawal",
			"reversal",
		]);
		table.string("provider");
		table.string("provider_reference");
		table.bigInteger("charge");
		table.bigInteger("balance").notNullable();
		table.text("meta");
		table.string("unique_key").notNullable().unique();
		table.timestamp("created_at").defaultTo(knex.fn.now());
		table.timestamp("updated_at").defaultTo(knex.fn.now());
		table.datetime("deleted_at", { useTz: true, precision: 6 });
		table
			.foreign("user_id")
			.references("id")
			.inTable("users");
			table
			.foreign("peer_user_id")
			.references("id")
			.inTable("users");
	});
}


export async function down(knex: Knex): Promise<void> {
	return knex.schema.dropTableIfExists("transactions");
}

