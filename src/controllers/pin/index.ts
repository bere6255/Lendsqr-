import { Request, Response } from "express" 
import setPin from "./setPin"

export default {
    setPin: async (req: Request, res: Response) => await setPin(req, res),
}
