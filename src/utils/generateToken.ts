import Token from "../models/Token";
const logPrefix = "[GEENERATE TOKEN]";
type verifyToken = {
    type: string
    identifier: string
}
export default async ({ identifier, type }: verifyToken) => {
    try {
        console.log(`${logPrefix} init`);
        const digits = "0123456789";
        let OTP = "";
        for (let i = 0; i < 4; i++) {
            OTP += digits[Math.floor(Math.random() * 10)];
        }

        await Token.query().insert({
            identifier,
            token: OTP,
            type,
            validity: 5,
            created_at: new Date(),
            updated_at: new Date()
        });

        return { status: true, data: { token: OTP }, message: "successful" };
    } catch (error: any) {
        console.log(`${logPrefix} Error ===> `, error.message, error.stack);

        return { status: false, data: {token : null}, message: "Error generating token" }
    }
}