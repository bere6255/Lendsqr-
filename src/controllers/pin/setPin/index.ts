import { Request, Response } from "express"
import validation from "./validation"
import setPing from "../../../services/pin/setPing"
const logPrefix = "[PIN:SETPIN:CONTROLLER]";
export default async (req: Request, res: Response) => {
	try {
		const user = req.user;
		console.log(`${logPrefix} init ===> user_id: `, user.id);
		
		const { errors, value } = await validation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		const { pin } = value
		const { status, statusCode, data, message } = await setPing({ pin, user });
		return res.status(statusCode).send({
			status,
			data,
			message,
		});
	} catch (error: any) {
		console.log(`${logPrefix} error ===> `, error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to set pin, please try again in a few minutes",
			errors: [],
		});

	}
}