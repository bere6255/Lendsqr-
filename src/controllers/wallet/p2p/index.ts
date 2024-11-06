import { Request, Response } from "express"
import p2p from "../../../services/wallet/p2p";
import validation from "./validation";
import User from "../../../models/User";
const logPrefix = "[WALLET:P2P:CONTROLLER]";
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

		const getPearUser = await User.query().findOne({id: value.to}).orWhere({email: value.to});

		if (!getPearUser) {
			console.log(`${logPrefix} reciver error: ${JSON.stringify(value)}`);
			
			return res.status(400).send({status: true, data:{}, message:"Reciver not found,"})
		}

		const fundRes = await p2p({ amount: value.amount, user, peerUser: getPearUser });

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