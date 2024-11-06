import generateRef from "../../utils/generateRef";
import debit from "./debit";
const logPrefix = "[WALLET:P2P:SERVICE]";

type fundWallet = {
    amount: string;
    user: any;
    peerUser: any;
}

export default async ({ amount, user, peerUser }: fundWallet) => {
    try {
        console.log(`${logPrefix} init ===> user: ${user.email} amount: ${amount}`);

        const reference = generateRef({ type: "p2p" });

        // handle validation checks
    
        return await debit({
            user_id: user.id,
            peer_user_id: peerUser.id,
            amount: -amount,
            charge: 0,
            description: `P22 of ₦${amount} to ${peerUser.firstName}`,
            outward: false,
            provider: "Lendsqr", // this will be the provider id not the name
            provider_reference: null,
            reference,
            status: "successful",
            type: "p2p"

        });
        
        
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "Fund wallet failed " }
    }
}