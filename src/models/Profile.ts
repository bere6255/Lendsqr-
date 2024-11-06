import { Model } from "objection" 

class UserProfile extends Model {
	static theTableName() {
		return "profile";
	}

	// Table name is the only required property.
	static get tableName() {
		return this.theTableName();
	}
}

export default UserProfile;
