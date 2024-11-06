import { Request, Response } from "express"
import view from "../../../services/profile/view";
const logPrefix = "[PROFILE:VIEWUSER:CONTROLLER]";
export default async (req: Request, res: Response) => {
	try {
		const user = req.user;

		console.log(`${logPrefix} init ===> user email: ${user.email}`);
		let email = req.params.email ? req.params.email : user.email;
		if (!email) {
			email = user.id;
		}
		const viweProfile = await view({ email });

		return res.status(200).send({
			status: viweProfile.status,
			data: viweProfile.data,
			message: viweProfile.message,
		});

	} catch (error: any) {
		console.log(`${logPrefix} error ===> `, error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to load user profile, please try again in a few minutes",
		});

	}
}