import { Request, Response } from "express"
import verifyFund from "../../../services/wallet/verifyFund";
import validation from "./validation";
const logPrefix = "[WALLET:VERIFYFUND:CONTROLLER]";
export default async (req: Request, res: Response) => {
	try {
		const user = req.user;
		console.log(`${logPrefix} init ===> `, JSON.stringify({ ...req.params }));

		const { errors, value } = await validation(req.params);

		if (errors) {
			return res.status(400).send({
				status: false,
				data: errors,
				message: errors[0],
			});
		}

		const fundRes = await verifyFund(value);

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