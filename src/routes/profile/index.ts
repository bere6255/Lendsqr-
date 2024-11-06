import {  Router } from 'express';
import profileRout from '../../controllers/profile';
import isAuth from '../../middleware/isAuth';
import auditUser from '../../middleware/auditUser';

const profile = Router()
profile.use(isAuth)
profile.use(auditUser)
profile.get('/', profileRout.viewUser)

export default profile