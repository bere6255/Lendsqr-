const { Model } = require("objection");

class FundInit extends Model {
	// Table name is the only required property.
	static get tableName() {
		return "fundInite";
	}

	static get idColumn() {
		return "id";
	}
	static get relationMappings() {

		return {
		
		};
	}

}

export default FundInit;
