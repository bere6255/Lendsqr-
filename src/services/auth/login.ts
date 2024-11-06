import User from "../../models/User"
import bcrypt from "bcryptjs"
import generateJWT from "../../utils/generateJWT"
import formatUser from "../../helpers/formatUser";
import ban from "../ban";
const logPrefix = "[SERVICE:AUTH:LOGIN]"
type login = {
	email: string
	password: string
	userAgent: string
}

export default async ({ email, password, userAgent }: login) => {
	try {

		const user = await User.query().findOne({ email }).whereNull("deleted_at");

		if (!user) {
			console.log(`${logPrefix} user not found email ${email}`);
			return {
				status: false,
				statusCode: 400,
				date: {},
				message: `Wrong email and password combination`,
			};
		}

		const validated = await bcrypt.compare(password, user.password);
		// login_attempts
		let attempt = 0;

		attempt = !user.login_attempts ? 0 : parseInt(user.login_attempts);
		if (validated === false) {

			if (attempt < 5) {
				attempt = attempt + 1;
				await User.query().findOne("id", "=", user.id).update({
					login_attempts: attempt,
				});
			} else {
				
				const comment = "Ban for exceeding login attempts";

				await ban({userID: user.id, banBy:"system:login", comment});
				return {
					status: false,
					statusCode: 401,
					data: {},
					message: comment,
				};
			}

			return {
				status: false,
				statusCode: 400,
				data: {},
				message: `Wrong email and password combination`,
			};

		}

		if (attempt >= 5) {
			return {
				status: false,
				statusCode: 400,
				data: {},
				message: "Ban for exceeding login attempts",
			};
		}
		await User.query().findOne("id", "=", user.id).update({
			login_attempts: 0,
		});

		const token = generateJWT(user.id);

		const userProfile = await formatUser(user.id);
		// send email notification to user
		return { status: true, statusCode: 200, data: { token, user: userProfile }, message: "Login successful" }
	} catch (error: any) {
		console.log(`${logPrefix} error ===>`, error.message, error.stack);
		return { status: false, statusCode: 400, data: {}, message: "Login failed " }
	}
}