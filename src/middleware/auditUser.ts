import * as dotenv from "dotenv";
dotenv.config()
import { Request, Response, NextFunction } from "express"
import { raw } from "objection";
import Transactions from "../models/Transactions"
import Wallet from "../models/Wallet"
const logPrefix = "[AUDIT:USER:MID]";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = req.user
        // checking if auth header contains token
        if (!user) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "Authorization user ",
            });
        }
        let balance =0;
        const sumTransaction = await Transactions.query()
                .select(raw("COALESCE(SUM(amount), 0)"))
                .where({ user_id: user.id, status: "successful" });
                balance = sumTransaction[0]["COALESCE(SUM(amount), 0)"] || 0;
            
            await Wallet.query().findOne({ user_id: user.id }).update({
                amount: balance
            })
       
        next()
    } catch (error: any) {
        console.log(`${logPrefix} error ===>`, error.message, error.stack);
        return res.status(401).send({
            status: false,
            data: {},
            message: "Unauthorized",
        });
    }

}