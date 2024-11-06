// import superagent from "superagent";
export {};

declare global {
  namespace Express {
    interface Request {
      user: any;
      token: string
    }
  }
}
// declare module "supertest" {
//   interface Test extends superagent.SuperAgentRequest {
//     authenticate(user: any): this;
//   }
// }