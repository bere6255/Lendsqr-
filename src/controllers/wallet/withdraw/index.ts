import { Request, Response } from "express"
import withdraw from "../../../services/wallet/withdraw";
import validation from "./validation";
const logPrefix = "[WALLET:WITHDRAWAL:CONTROLLER]";
export default async (req: Request, res: Response) => {
	try {
		const user = req.user;
		console.log(`${logPrefix} init ===> `, JSON.stringify({ ...req.body }));

		const { errors, value } = await validation(req.body);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}


		const fundRes = await withdraw({ amount: value.amount, user });

		return res.status(200).send({
			status: fundRes.status,
			data: fundRes.data,
			message: fundRes.message,
		});

	} catch (error: any) {
		console.log(`${logPrefix} error ===> `, error.message, error.stack);
		return res.status(400).send({
			status: false,
			data: {},
			message: "Failed to process transaction, please try again in a few minutes",
		});

	}
}