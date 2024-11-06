import Pin from '../../models/Pin';
import bcrypt from "bcryptjs"

const logPrefix = "[PIN:SETPIN:SERVICE]";
const saltRounds = process.env.SALT_ROUNDS || '10';

type setPing = {
    pin: string,
    user: any
}

export default async ({ pin, user }: setPing) => {
    try {
        console.log(`${logPrefix} init ===> user_id: ${user.email}`);
        
        const conPin = `${pin}`
        const checkPin = await Pin.query().findOne({ user_id: user.id });
        if (checkPin) {
            return {
                status: false,
                statusCode: 400,
                data: [],
                message: "You have already set your pin",
            };
        }
        const newPin = await bcrypt.hash(
            conPin.toString(),
            parseInt(saltRounds)
        );

        await Pin.query().insert({
            user_id: user.id,
            pin: newPin,
            pin_attempts: 0,
            reset_attempts: 0,
            created_at: new Date()
        });

        return { status: true, statusCode: 200, data: {}, message: "Pin set successful" }
    } catch (error: any) {
        console.log(`${logPrefix} error ===> `, error.message, error.stack);
        return { status: false, statusCode: 401, data: {}, message: "Set pin failed " }
    }
}