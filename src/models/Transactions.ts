const { Model } = require("objection");

class Transactions extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "transactions";
	}

	static get idColumn() {
		return "id";
	}
	static get relationMappings() {

		return {
		
		};
	}

}

export default Transactions;
