import {  Router } from 'express';
import authRout from '../../controllers/auth'

const auth = Router()
auth.post('/login', authRout.login)
auth.post('/register', authRout.register)

export default auth