import { Router } from 'express'
import {signIn, register} from './controller'


const router = new Router();
router.post('/register', register);
router.post('/sign_in', signIn);
export default router