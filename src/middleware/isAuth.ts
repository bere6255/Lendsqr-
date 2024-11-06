import * as dotenv from "dotenv";
dotenv.config()
import { Request, Response, NextFunction } from "express"
import jwt from "jsonwebtoken"
import User from "../models/User"
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY||"";
const logPrefix = "[MIDDLEWARE:ISAUTH]";

export default async (req: Request, res: Response, next: NextFunction) => {
    try {
        // checking if auth header contains token
        if (!req.headers || !req.headers.authorization) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "no authorization header found",
            });
        }

        // getting authorization header

        const bearerHeader = req.headers.authorization;
        // splitting bearer

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        const verify = jwt.verify(bearerToken, ENCRYPTION_KEY);
        // check if user exist
        const jwtPayload = <any>verify
        if (!jwtPayload.exp) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "Unauthorized",
            });
        }


        // check blacklist from Lendsqr
     

        const user = await User.query()
            .findOne({
                id: jwtPayload.id,
            }).whereNull("deleted_at");
            
        if (!user) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "Unauthorized",
            });
        }

        if (user.banned_at) {
            return res.status(401).send({
                status: false,
                data: {},
                message: "account banned please contact support",
            });
        }

        req.token = bearerToken;
        req.user = user;

        next()
    } catch (error: any) {
        console.log(`${logPrefix} error ===>`, error.message);
        return res.status(401).send({
            status: false,
            data: {},
            message: "Unauthorized",
        });
    }

}