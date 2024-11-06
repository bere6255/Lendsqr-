import { Request, Response } from "express" 
import viewUser from "./viewUser"

export default {
    viewUser: async (req: Request, res: Response) => await viewUser(req, res),
}
