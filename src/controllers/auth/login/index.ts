import { Request, Response } from "express"
import validation from "./validation";
import login from "../../../services/auth/login";
const logPrefix = "[AUTH:LOGIN:CONTROLLER]";

export default async (req: Request, res: Response) => {
	try {
		console.log(`${logPrefix} init ===> `, JSON.stringify({ ...req.body, password: null }));

		const { errors, value } = await validation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}
		
		const {status, statusCode, data, message} = await login({...value, userAgent:  req.headers['user-agent']})

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
			message: "Failed to login, please try again in a few minutes",
			errors: [],
		});

	}
}