import User from "../../models/User"
import bcrypt from "bcryptjs"
import { transaction } from "objection"
import Wallet from "../../models/Wallet"
import Profile from "../../models/Profile"
import generateJWT from "../../utils/generateJWT"
import formatUser from "../../helpers/formatUser"
import { karma } from "../thirdparty/lendsqr"
type register = {
    firstName: string
    lastName: string
    email: string
    password: string
}
const saltRounds = process.env.SALT_ROUNDS || "10";
const logPrefix = "[AUTH:REGISTER:SERVICE]";

export default async ({ firstName, lastName, email, password }: register) => {
    try {
        console.log(`${logPrefix} init ===> `, JSON.stringify({ firstName, lastName, email }));

        const checkKarma = await karma(email);

        if (checkKarma.status === "success") {
            //    handle susccess karma response
        } else {
            // return { statusCode: 400, status: false, data: {}, message: "We are unable to process your request at the moment. please try later" }
        }

        const userEmail = await User.query().findOne({ email });

        if (userEmail) {
            return {
                status: false,
                statusCode: 400,
                data: {},
                message:
                    "You already have an account with this email, please login",
            };
        }

        let passwordHash: any = null;
        if (password) {
            passwordHash = await bcrypt.hash(password, parseInt(saltRounds));
        }
        let newUser: any = null;

        try {
            await transaction(
                User,
                Wallet,
                Profile,
                async (User: any, Wallet: any, Profile: any) => {
                    const newUserData = {
                        firstName,
                        lastName,
                        email,
                        password: passwordHash,
                        email_verified_at: new Date,
                        created_at: new Date(),
                        updated_at: new Date(),
                    };

                    newUser = await User.query().insertAndFetch(newUserData);

                    await Wallet.query().insert({
                        user_id: newUser.id,
                        amount: 0,
                        created_at: new Date(),
                        updated_at: new Date(),
                    });

                    await Profile.query().insert({
                        user_id: newUser.id,
                    });
                }
            );
        } catch (error: any) {
            console.log(`${logPrefix} account creation error ===> `, error.message, error.stack);
            return {
                status: false,
                statusCode: 400,
                data: {},
                message: "Registration error, kindly try again in a few minutes",
            };
        }
        if (!newUser) {
            console.log(`${logPrefix} Registration error ===>  newUser not created`);
            return {
                status: false,
                statusCode: 400,
                data: {},
                message: "Registration error, kindly try again in a few minutes",
            };
        }

        const token = generateJWT(newUser.id);

        const theUser = await formatUser(newUser.id);

        // send email notification to user

        return {
            status: true,
            statusCode: 200,
            data: { token, user: theUser },
            message: "Registration successful"
        };
    } catch (error: any) {
        console.log(`${logPrefix} error ===>`, error.message, error.stack);
        return { status: false, statusCode: 400, data: {}, message: "Registration failed, kindly try again in a few minutes " }
    }
}