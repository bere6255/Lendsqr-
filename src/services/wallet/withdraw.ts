import User from "../../models/User";
import generateRef from "../../utils/generateRef";
import debit from "./debit";
import { bankVerification, bankTransfer } from "../thirdparty/lendsqr";
const logPrefix = "[WALLET:WITHDRAW:SERVICE]";

type fundWallet = {
    amount: string;
    user: any;
}

export default async ({ amount, user }: fundWallet) => {
    try {
        console.log(`${logPrefix} init ===> user: ${user.email} amount: ${amount}`);

        // get processor details

        const processor = await User.query().findOne({ id: 1 });
        if (!processor) {
            // handle autor swich of service provider from the number of faild and success
            console.log(`${logPrefix} processor unavaileble error ===> `);
            return { status: false, statusCode: 400, data: {}, message: "Withdrawal faild, please try again" }
        }

        const reference = generateRef({ type: "p2p" });

        // handle validation checks

        // get user withdrawal bank 

        const bankDetails = {
            "bank_code": "058",
            "account_name": "DOE JOHN",
            "account_number": "0425571111",
        }
        const description = `withdrawal of ₦${amount} to ${bankDetails.account_name} ${bankDetails.account_number}`;
        const debitRes = await debit({
            user_id: user.id,
            peer_user_id: processor.id,
            amount: -amount * 100,
            charge: 0,
            description,
            outward: false,
            provider: "Lendsqr", // this will be the provider id not the name
            provider_reference: null,
            reference,
            status: "successful",
            type: "withdrawal"

        });
        if (debitRes.status) {
            const bankVerificationRes = await bankVerification({
                account_number: bankDetails.account_number,
                bank_code: bankDetails.bank_code
            });
            if (bankVerificationRes.status === "success") {
                const bankTransferRes = await bankTransfer({
                    account_number: bankDetails.account_number,
                    bank_code: bankDetails.bank_code,
                    amount,
                    description,

                });
                // log bankTransferRes for dispute and other validation check

            }
        }

        return debitRes;

    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "Fund wallet failed " }
    }
}