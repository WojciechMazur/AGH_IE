import { Router } from 'express'
import trainingSession from './trainingSession'
import training from './training'
import trainer from './trainer'
import user from './user'
import auth from './auth'
import {loginRequired} from "./auth/controller";

const router = new Router();
router.use('/trainingSessions', loginRequired, trainingSession);
router.use('/trainings', loginRequired, training);
router.use('/trainers', loginRequired, trainer);
router.use('/users', loginRequired, user);
router.use('/auth', auth);

export default router