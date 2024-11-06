import generateRef from "../../utils/generateRef";
import FundInit from "../../models/FundInite";
const logPrefix = "[WALLET:FUND:SERVICE]";

type fundWallet = {
    amount: string,
    user: any
}

export default async ({ amount, user }: fundWallet) => {
    try {
        console.log(`${logPrefix} init ===> user: ${user.email} amount: ${amount}`);

        const accountNumber = Math.floor(Math.random() * 1000000000);
        const bankName = "Lendsqr";
        const note = `Make a tranfer of ₦${amount} to the details`;
        const reference = generateRef({ type: "funding" });

        await FundInit.query().insert({
            user_id: user.id,
            amount: parseInt(amount) * 100,
            reference,
            created_at: new Date(),
            updated_at: new Date(),
        });
        
        return { status: true, statusCode: 200, data: { accountNumber, bankName, note, reference }, message: "Fund wallet successful" }
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "Fund wallet failed " }
    }
}