import {  Router } from 'express';
import walletRout from '../../controllers/wallet';
import isAuth from '../../middleware/isAuth';

const wallet = Router()
wallet.use(isAuth)
wallet.post('/p2p', walletRout.p2p)
wallet.post('/fund', walletRout.fund)
wallet.post('/withdraw', walletRout.withdraw)
wallet.get('/verify-fund/:reference', walletRout.verifyFund)

export default wallet