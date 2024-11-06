require("dotenv").config()
import { Model } from "objection"
import Wallet from "./Wallet"
import Profile from "./Profile"
import Pin from "./Pin"

class User extends Model {
    [x: string]: any
	id: any;
	firstName: any;
	lastName: any;
	phone: any;
	email: any;
	profile: any;
	tag: any;
	avatar: any;
	password: any
	country?: string;
	limit: any;
	phone_verified_at: any
	email_verified_at: any
	reset_password_attempts: any
	bvn_verified_at: any
	login_attempts: any
	notification: any
	created_at: any;
	banned_at: any;
	deleted_at: any;
	updated_at: any;
	static theTableName() {
		return "users";
	}

	// Table name is the only required property.
	static get tableName() {
		return this.theTableName();
	}

	static get idColumn() {
		return "id";
	}

	static get relationMappings() {

		return {
			wallets: {
				relation: Model.BelongsToOneRelation,
				modelClass: Wallet,
				join: {
					from: "users.id",
					to: "wallets.user_id",
				},
			},
			profile: {
				relation: Model.BelongsToOneRelation,
				modelClass: Profile,
				join: {
					from: "users.id",
					to: "profile.user_id",
				},
			},
			pin: {
				relation: Model.HasOneRelation,
				modelClass: Pin,
				join: {
					from: "users.id",
					to: "pins.user_id",
				},
			},
		};
	}

	user() {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			phone: this.phone,
			email: this.email,
			tag: this.tag,
			profile: this.profile
				? this.profile : {},
			avatar: !this.avatar ? null : JSON.parse(this.avatar),
			notification: this.notification !== 0,
			country: this.country,
			phone_verified_at: this.phone_verified_at ? true : false,
			email_verified_at: this.email_verified_at ? true : false,
			bvn_verified_at: this.bvn_verified_at ? true : false,
			isPin: false,
			limit: this.limit,
			wallet: {
				
			},
			created_at: this.created_at,
			banned_at: this.banned_at,
			updated_at: this.updated_at,
		};
	}
	wallet(wallet: any) {
		throw new Error("Method not implemented.");
	}

	userSimplified() {
		return {
			firstName: this.firstName,
			lastName: this.lastName,
			phone: this.phone,
			email: this.email,
			tag: this.tag,
			avatar: !this.avatar ? null : this.avatar,
			created_at: this.created_at,
		};
	}


}

export default User;
