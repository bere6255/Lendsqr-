import {  Router } from 'express';
import pinRout from '../../controllers/pin'
import isAuth from '../../middleware/isAuth';

const pin = Router()
pin.use(isAuth)
pin.post('/set-pin', pinRout.setPin)

export default pin