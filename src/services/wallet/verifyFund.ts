import FundInit from "../../models/FundInite";
import debit from "./debit";
const logPrefix = "[WALLET:VERIFYFUND:SERVICE]";

type fundWallet = {
    reference: string
}

export default async ({ reference }: fundWallet) => {
    try {
        console.log(`${logPrefix} init ===> ref: ${reference}`);

        const processorID = "1";

        const getinitialFunding = await FundInit.query().findOne({
            reference,
        });

        if (!getinitialFunding) {
            return { status: false, statusCode: 400, data: { reference }, message: "Transaction not found" }
        }
        // call third party payment processor to verify the transaction 
        // depending on the status of the transaction handle the request accordingly
        // for this we will just go on with successfull response

        return await debit({
            user_id: getinitialFunding.user_id,
            peer_user_id: processorID,
            amount: getinitialFunding.amount,
            charge: 0,
            description: `funding of ₦${getinitialFunding.amount}`,
            outward: false,
            provider: "Lendsqr", // this will be the provider id not the name
            provider_reference: null,
            reference: getinitialFunding.reference,
            status: "successful",
            type: "funding"

        });

    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "Fund wallet failed " }
    }
}