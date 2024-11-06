import { Request, Response } from "express"
import registerValidation from "./validation"
import register from "../../../services/auth/register";
const logPrefix = "[AUTH:REGISTER:CONTROLLER]";
export default async (req: Request, res: Response) => {
	console.log(`${logPrefix} INIT ===> `, JSON.stringify({ ...req.body, token: null, password: null }));
	try {

		const { errors, value } = await registerValidation(req.body);

		if (errors) {
			console.log(`${logPrefix} validation error ===>`, JSON.stringify(errors));
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}

		const { status, statusCode, data, message } = await register(value);

		return res.status(statusCode).json({ status, data, message })
	} catch (error: any) {
		console.log(`${logPrefix} Error ===> `, error.message, error.stack);
		return res.status(500).send({
			status: false,
			data: {},
			message: "Registration failed, please try again in a few minutes",
			errors: [],
		});

	}
}