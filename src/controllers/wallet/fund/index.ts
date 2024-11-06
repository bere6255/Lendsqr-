import { Request, Response } from "express"
import fund from "../../../services/wallet/fund";
import validation from "./validation";
const logPrefix = "[WALLET:FUND:CONTROLLER]";
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

		const fundRes = await fund({ amount: value.amount, user });

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
			message: "Failed to initiate account funding, please try again in a few minutes",
		});

	}
}