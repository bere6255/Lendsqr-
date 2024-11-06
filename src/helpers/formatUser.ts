import Pin from "../models/Pin";
import User from "../models/User";
const BUCKET_URL = process.env.BUCKET_URL;
const logPrefix = "[HELPERS:FORMATUSER:CONTROLLER]";
export default async (id: string) => {
    try {
        const userProfile = await User.query().findOne({ id }).withGraphFetched("profile").withGraphFetched("wallets");
        if (!userProfile) {
            return null;
        }
        delete userProfile.password;
        delete userProfile.login_attempts;
        delete userProfile.reset_password_attempts;
        let userRawWallets = userProfile.wallets;
        let totalBalance = 0;
        let isPin = false;

        const checkPin = await Pin.query().findOne({ user_id: id });
        if (checkPin) {
            isPin = true;
        }

        userProfile.isPin = isPin

        for (let index = 0; index < userRawWallets.length; index++) {
            totalBalance = totalBalance + userRawWallets[index].amount;

        }

        userProfile.avatar = userProfile.avatar ? `${BUCKET_URL}/profile_image/${userProfile.avatar}` : `${BUCKET_URL}/profile_image/default.png`;

        return { user: userProfile, totalBalance }

    } catch (error: any) {
        console.log(`${logPrefix} error ===> user: ${id}`, error.message, error.stack);
        return null;
    }
}