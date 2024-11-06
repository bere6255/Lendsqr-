import User from '../../models/User';

const logPrefix = "[PROFILE:VIEW:SERVICE]";

type viweProfile = {
    email: string
}

export default async ({ email }: viweProfile) => {
    try {
        console.log(`${logPrefix} init ===> tag: ${email}`);

        const userProfile = await User.query().findOne({ email }).withGraphFetched("profile").withGraphFetched("wallets").orWhere({ id: email }).withGraphFetched("profile").withGraphFetched("wallets");

        delete userProfile?.password;
        delete userProfile?.login_attempts;
        delete userProfile?.reset_password_attempts;
        delete userProfile?.remember_token;
        delete userProfile?.remember_token;
        delete userProfile?.deleted_at;

        return { status: true, statusCode: 200, data: { ...userProfile }, message: "Profile view successful" }
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "View profile failed " }
    }
}