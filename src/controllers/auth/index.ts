import { Request, Response } from "express" 
import login from "./login"
import register from "./register"

export default {
    login: async (req: Request, res: Response) => await login(req, res),
    register: async (req: Request, res: Response) => await register(req, res),
}
