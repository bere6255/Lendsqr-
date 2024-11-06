import {  Router } from 'express';
import auth from './auth';
import profile from './profile';
import pin from "./pin";
import wallet from "./wallet";

const routes = Router()
routes.use('/auth/', auth)
routes.use('/profile/', profile)
routes.use('/pin/', pin)
routes.use('/wallet/', wallet)

routes.get('/', (req, res) => {
  res.status(200).send({status: true, data: {}, message:"Wellcome Lendsqr core service🚀🚀🛰🛰"});
})

export default routes