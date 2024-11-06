import { Request, Response } from "express" 
import fund from "./fund"
import verifyFund from "./verifyFund"
import p2p from "./p2p"
import withdraw from "./withdraw"

export default {
    p2p: async (req: Request, res: Response) => await p2p(req, res),
    fund: async (req: Request, res: Response) => await fund(req, res),
    withdraw: async (req: Request, res: Response) => await withdraw(req, res),
    verifyFund: async (req: Request, res: Response) => await verifyFund(req, res),
}
