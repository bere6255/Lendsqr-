import { transaction } from "objection"
import Wallet from "../../models/Wallet";
import Transactions from "../../models/Transactions";
const logPrefix = "[WALLET:DEBIT:SERVICE]";

type fundWallet = {
    user_id: string;
    peer_user_id: string;
    amount: number;
    reference: string;
    description: string;
    outward: boolean;
    status: string;
    type: string;
    provider: string;
    provider_reference: string | null;
    charge: number;
}

export default async (payload: fundWallet) => {
    try {
        const { user_id, peer_user_id, amount, reference, description, outward, status, type, provider, provider_reference, charge } = payload;
        console.log(`${logPrefix} init ===> ${JSON.stringify(payload)}`);
        // to be move to wallet service
        // this section has too many checks that can not be done on this sevice etc most of the action and trigers are to be done by the database stored procedure and function 

        /** Attempt to debit sender */
        if (amount < 0) {
            const theAmount = Math.abs(amount);

            const balance = await Wallet.query()
                .decrement("amount", theAmount)
                .where("amount", ">=", theAmount)
                .where({ id: user_id });

            if (balance === 0) {
                return {
                    statusCode: 400,
                    status: false,
                    data: {},
                    message: "Insufficient Funds",
                };
            }

            try {
                await transaction(
                    Transactions,
                    async (Transactions: any) => {
                        const debitUser = {
                            user_id,
                            peer_user_id,
                            amount,
                            reference,
                            description,
                            outward,
                            status,
                            type,
                            provider,
                            provider_reference,
                            charge,
                            balance: 0,
                            unique_key: `dr_${reference}`,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };
                        await Transactions.query().insert(debitUser);
                        const creditUser = {
                            user_id,
                            peer_user_id,
                            amount,
                            reference,
                            description,
                            outward,
                            status,
                            type,
                            provider,
                            provider_reference,
                            charge,
                            balance: 0,
                            unique_key: `cr_${reference}`,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };

                        await Transactions.query().insert(creditUser);

                    }
                );
            } catch (error: any) {
                console.log(`${logPrefix} debit error ===> `, error.message, error.stack);
                return {
                    status: false,
                    statusCode: 400,
                    data: {},
                    message: "Processing transaction faild, kindly try again in a few minutes",
                };
            }

        } else{
          

            try {
                await transaction(
                    Transactions,
                    async (Transactions: any) => {
                        const creditUser = {
                            user_id,
                            peer_user_id,
                            amount,
                            reference,
                            description,
                            outward,
                            status,
                            type,
                            provider,
                            provider_reference,
                            charge,
                            balance: 0,
                            unique_key: `cr_${reference}`,
                            created_at: new Date(),
                            updated_at: new Date(),
                        };
                        await Transactions.query().insert(creditUser);

                    }
                );
            } catch (error: any) {
                console.log(`${logPrefix} credit error ===> `, error.message, error.stack);
                return {
                    status: false,
                    statusCode: 400,
                    data: {},
                    message: "Processing transaction faild, kindly try again in a few minutes",
                };
            }

        }


        return { status: true, data: { }, message: "Processing transaction " }
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "Processing transaction failed, kindly try again in a few minutes " }
    }
}